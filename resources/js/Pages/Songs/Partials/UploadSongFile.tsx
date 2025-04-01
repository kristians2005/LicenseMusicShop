import React, { useState, useRef } from "react";

interface UploadSongFileProps {
    onFileSelect: (file: File) => void;
}

export default function UploadSongFile({ onFileSelect }: UploadSongFileProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOut = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFiles(files[0]);
        }
    };

    const handleFiles = (file: File) => {
        if (file.type.startsWith("audio/")) {
            setFile(file);
            onFileSelect(file);
        } else {
            alert("Please upload an audio file");
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <div
                    className={`
                        card bg-base-100 shadow-xl
                        border-2 border-dashed
                        p-8
                        flex flex-col items-center justify-center
                        transition-colors duration-200
                        ${
                            isDragging
                                ? "border-primary bg-primary/5"
                                : "border-base-300 bg-base-200/50"
                        }
                        hover:border-primary
                        cursor-pointer
                    `}
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleButtonClick}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="audio/*"
                        onChange={(e) =>
                            e.target.files && handleFiles(e.target.files[0])
                        }
                    />

                    {file ? (
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-lg font-medium text-base-content">
                                    {file.name}
                                </p>
                            </div>
                            <p className="text-sm text-base-content/70">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    ) : (
                        <>
                            <svg
                                className="w-16 h-16 text-base-content/50 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                />
                            </svg>
                            <p className="text-lg text-center font-medium text-base-content">
                                Drag and drop your audio file here
                            </p>
                            <p className="text-sm text-base-content/70 mt-2">
                                or click to select a file
                            </p>
                            <p className="text-xs text-base-content/50 mt-4">
                                Supported formats: MP3, WAV
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
