import React from "react";

interface SongCardProps {
    title: string;
    artist: string;
    albumCover: string;
    onPlay: () => void;
}

export default function SongCardPrototype({
    title,
    artist,
    albumCover,
    onPlay,
}: SongCardProps) {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="relative aspect-square">
                <img
                    className="w-full h-full object-cover"
                    src={albumCover}
                    alt={`${title} album cover`}
                />
                <div className="absolute inset-0 bg-base-100/20 backdrop-blur-sm flex items-center justify-center">
                    <button
                        onClick={onPlay}
                        className="btn btn-circle btn-primary"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title text-base-content">{title}</h2>
                <p className="text-base-content/70">{artist}</p>
            </div>
        </div>
    );
}
