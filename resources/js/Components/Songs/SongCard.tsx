import { Link } from "@inertiajs/react";
import { Song } from "@/types";

interface SongCardProps {
    song: Song;
    onPlay?: () => void;
    onAddToCart?: () => void;
}

export default function SongCard({ song, onPlay, onAddToCart }: SongCardProps) {
    return (
        <div className="card bg-base-100 shadow-xl group">
            <Link href={route("songs.show", song.id)}>
                <figure className="relative aspect-square bg-base-300 flex items-center justify-center">
                    <div className="text-4xl text-base-content/50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5V4.5m0 6.553L12.75 9"
                            />
                        </svg>
                    </div>
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
            <div className="card-body">
                <Link href={route("songs.show", song.id)}>
                    <h2 className="card-title text-base-content">
                        {song.name}
                    </h2>
                    <p className="text-base-content/70">{song.artist}</p>
                </Link>
                <div className="flex flex-wrap gap-1 mt-2">
                    {song.genres.map((genre) => (
                        <span key={genre.id} className="badge badge-sm">
                            {genre.name}
                        </span>
                    ))}
                </div>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-lg font-bold text-primary">
                        ${Number(song.price).toFixed(2)}
                    </span>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={onAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
