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
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
                className="w-full"
                src={albumCover}
                alt={`${title} album cover`}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{artist}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button
                    onClick={onPlay}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Play
                </button>
            </div>
        </div>
    );
}
