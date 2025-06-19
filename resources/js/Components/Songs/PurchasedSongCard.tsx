import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

interface Song {
    id: number;
    name: string;
    artist: string;
    cover: string;
    price: number;
    genres: Array<{ id: number; name: string }>;
}

interface PurchasedSongCardProps {
    song: Song;
}

export default function PurchasedSongCard({ song }: PurchasedSongCardProps) {
    // const handleDownload = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     router.visit(route("songs.download", song.id));
    // };

    return (
        <div className="card bg-gradient-to-br from-primary/10 to-base-100 shadow-2xl border border-primary/20 group flex flex-col w-full h-full relative">
            {/* Owned Badge */}
            <span className="absolute top-3 right-3 z-10 bg-success text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Owned
            </span>
            {/* Cover Image */}
            <figure className="relative aspect-square bg-base-300 flex items-center justify-center rounded-t-xl overflow-hidden">
                {song.cover ? (
                    <img
                        className="w-full h-full object-cover"
                        src={
                            song.cover.startsWith("/")
                                ? song.cover
                                : `/${song.cover}`
                        }
                        alt={song.name}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-base-content/40 text-4xl">
                        ♫
                    </div>
                )}
            </figure>
            {/* Song Info */}
            <div className="card-body flex flex-col gap-2">
                <div>
                    <h2 className="card-title text-primary">{song.name}</h2>
                    <p className="text-base-content/70">{song.artist}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                    {song.genres.map((genre: any) => (
                        <span
                            key={genre.id}
                            className="badge badge-outline badge-primary"
                        >
                            {genre.name}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-primary">
                        ${Number(song.price).toFixed(2)}
                    </span>
                    <a
                        className="btn btn-success btn-sm shadow"
                        href={route("songs.download", song.id)}
                        target="_blank"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                            />
                        </svg>
                        Download
                    </a>
                </div>
            </div>
        </div>
    );
}
