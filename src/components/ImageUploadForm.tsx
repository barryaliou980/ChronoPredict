"use client";

import { useState, useRef, useCallback } from "react";

interface Props {
  onSubmit: (file: File) => void;
  isLoading: boolean;
  instruction: string;
}

export default function ImageUploadForm({ onSubmit, isLoading, instruction }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = useCallback((selectedFile: File) => {
    setError(null);

    if (!selectedFile.type.startsWith("image/")) {
      setError("Veuillez sélectionner un fichier image (JPEG, PNG, etc.)");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Le fichier ne doit pas dépasser 10 Mo");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        validateAndSetFile(droppedFile);
      }
    },
    [validateAndSetFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        validateAndSetFile(selectedFile);
      }
    },
    [validateAndSetFile]
  );

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
        <div className="space-y-1 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Image Médicale
          </h2>
          <p className="text-slate-500 text-sm italic">{instruction}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-sm font-bold">
              !
            </div>
            <p className="text-sm font-bold text-rose-700">{error}</p>
          </div>
        )}

        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            className={`relative cursor-pointer border-2 border-dashed rounded-[2rem] p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-slate-200 bg-slate-50 hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-slate-700 font-bold text-lg">
                  Glissez-déposez votre image ici
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  ou <span className="text-primary font-semibold">parcourez vos fichiers</span>
                </p>
              </div>
              <p className="text-slate-400 text-xs">
                Formats acceptés : JPEG, PNG, WebP - Max 10 Mo
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50">
              <img
                src={preview}
                alt="Aperçu de l'image"
                className="w-full max-h-[400px] object-contain p-4"
              />
              <button
                onClick={handleRemove}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-700 truncate">{file?.name}</p>
                <p className="text-xs text-slate-400">
                  {file ? (file.size / 1024 / 1024).toFixed(2) : 0} Mo
                </p>
              </div>
              <button
                onClick={() => inputRef.current?.click()}
                className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
              >
                Changer
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !file}
          className="group relative px-12 py-5 rounded-[2rem] text-lg font-extrabold text-white medical-gradient hover:scale-105 active:scale-95 disabled:grayscale-[0.5] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl shadow-primary/30"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyse en cours...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              {!file ? "Sélectionnez une image" : "Lancer l'Analyse par Image"}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
