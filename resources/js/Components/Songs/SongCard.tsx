import { Link, router } from "@inertiajs/react";
import { Song, user } from "@/types";
import { useEffect, useState } from "react";

interface SongCardProps {
    auth: {
        user?: user;
        role: string;
    };
    song: Song;
    onPlay?: () => void;
    onAddToCart?: () => void;
}

export default function SongCard({
    auth = { user: undefined, role: "" },
    song,
    onPlay,
    onAddToCart,
}: SongCardProps) {
    const [fontSize, setFontSize] = useState(
        typeof window !== "undefined"
            ? localStorage.getItem("fontSize") || "normal"
            : "normal"
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setFontSize(
                document.documentElement.getAttribute("data-font-size") ||
                    "normal"
            );
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const cardHeightClass =
        fontSize === "large"
            ? "h-[700px] md:h-[600px]"
            : "h-[600px] md:h-[500px]";

    return (
        <div
            className={`card bg-base-100 shadow-xl w-[300px] sm:w-full ${cardHeightClass} flex flex-col relative`}
        >
            {song.owned && (
                <span className="absolute top-3 right-3 z-10 bg-success text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Owned
                </span>
            )}
            {auth?.role === "admin" && (
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    <Link
                        href={route("songs.edit", song.id)}
                        className="btn btn-xs btn-outline btn-primary"
                    >
                        Edit
                    </Link>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (
                                confirm(
                                    "Are you sure you want to delete this song?"
                                )
                            ) {
                                router.delete(route("songs.destroy", song.id));
                            }
                        }}
                    >
                        <button
                            type="submit"
                            className="btn btn-xs btn-outline btn-error"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            )}

            <Link href={route("songs.show", song.id)} className="flex-shrink-0">
                <figure className="relative  aspect-square bg-base-300 flex items-center justify-center rounded-t-xl overflow-hidden">
                    {song.cover && (
                        <img
                            className="w-full h-full object-cover"
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
            <div className="card-body flex flex-col flex-1 min-h-0 justify-between">
                <div>
                    <Link href={route("songs.show", song.id)}>
                        <h2 className="card-title line-clamp-2 text-base-content">
                            {song.name}
                        </h2>
                        <p className="text-base-content/70">{song.artist}</p>
                    </Link>
                    <div className="flex flex-wrap gap-1 mt-2">
                        <div className="flex gap-1 flex-wrap ">
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
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-primary">
                        ${Number(song.price).toFixed(2)}
                    </span>
                    {!song.owned && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                router.post(route("songs.purchase", song.id));
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-error btn-sm"
                            >
                                Buy
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
