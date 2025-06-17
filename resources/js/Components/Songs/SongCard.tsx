import { Link } from "@inertiajs/react";
import { Song } from "@/types";
import { useState } from "react";

interface SongCardProps {
    song: Song;
    onPlay?: () => void;
    onAddToCart?: () => void;
}

export default function SongCard({ song, onPlay, onAddToCart }: SongCardProps) {
    // Show only 3 genres on small screens, all on md+
    const [showAllGenres, setShowAllGenres] = useState(false);
    const genresToShow =
        typeof window !== "undefined" &&
        window.innerWidth < 768 &&
        !showAllGenres
            ? song.genres.slice(0, 3)
            : song.genres;

    return (
        <div className="card bg-base-100 shadow-xl group w-full h-full flex flex-col">
            <Link href={route("songs.show", song.id)}>
                <figure className="relative aspect-square bg-base-300 flex items-center justify-center">
                    {song.cover && (
                        <img
                            className="w-full h-full object-cover rounded-t-xl"
                            src={
                                song.cover.startsWith("/")
                                    ? song.cover
                                    : `/${song.cover}`
                            }
                            alt={song.name}
                        />
                    )}
                    <div className="absolute inset-0 bg-base-100/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            className="btn btn-circle btn-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                onPlay?.();
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    </div>
                </figure>
            </Link>
            <div className="card-body flex flex-col flex-1">
                <Link href={route("songs.show", song.id)}>
                    <h2 className="card-title text-base-content">
                        {song.name}
                    </h2>
                    <p className="text-base-content/70">{song.artist}</p>
                </Link>
                <div className="flex flex-wrap gap-1 mt-2">
                    {/* Show only 3 genres on md and below, all on lg+ */}
                    <div className="block xl:hidden">
                        {song.genres.slice(0, 3).map((genre) => (
                            <span key={genre.id} className="badge badge-sm">
                                {genre.name}
                            </span>
                        ))}
                        {song.genres.length > 3 && (
                            <span className="badge badge-ghost badge-sm">
                                +{song.genres.length - 3} more
                            </span>
                        )}
                    </div>
                    <div className="hidden xl:flex flex-wrap gap-1">
                        {song.genres.map((genre) => (
                            <span key={genre.id} className="badge badge-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-lg font-bold text-primary">
                        ${Number(song.price).toFixed(2)}
                    </span>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={onAddToCart}
                    >
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
}
