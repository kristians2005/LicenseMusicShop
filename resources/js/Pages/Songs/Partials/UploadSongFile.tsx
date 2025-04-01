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
        <div className=" flex items-center justify-center">
            <div className="w-3/4 bg-white md:px-10 md:py-28 md:m-10 sm:m-4 rounded-lg shadow-xl">
                <div
                    className={`
                    w-full max-w-2xl mx-auto
                    border-4 border-dashed rounded-lg
                    p-12
                    flex flex-col items-center justify-center
                    transition-colors duration-200
                    ${
                        isDragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 bg-gray-50"
                    }
                    hover:border-blue-400
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
                            <p className="text-lg font-medium text-gray-800">
                                {file.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    ) : (
                        <>
                            <svg
                                className=" animate-fade-in w-16 h-16 text-gray-400 mb-4"
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
                            <p className="text-lg text-center font-medium text-gray-800">
                                Drag and drop your audio file here
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                or click to select a file
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
