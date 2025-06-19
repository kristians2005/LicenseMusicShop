import { Link, router } from "@inertiajs/react";
import { Song } from "@/types";

interface ArtistSongCardProps {
    song: Song;
    onPlay?: () => void;
    onAddToCart?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function ArtistSongCard({
    song,
    onPlay,
    onAddToCart,
    onEdit,
    onDelete,
}: ArtistSongCardProps) {
    return (
        <div className="card bg-base-100 shadow-xl group flex flex-col w-full h-full">
            {/* Cover Image & Play Button */}
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
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-base-100/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        className="btn btn-circle btn-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            onPlay?.();
                        }}
                        aria-label="Play"
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

            {/* Song Info */}
            <div className="card-body flex flex-col gap-2">
                <div>
                    <h2 className="card-title text-base-content">
                        {song.name}
                    </h2>
                    <p className="text-base-content/70">{song.artist}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                    {song.genres.map((genre) => (
                        <span key={genre.id} className="badge badge-sm">
                            {genre.name}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-primary">
                        ${Number(song.price).toFixed(2)}
                    </span>
                    <div className="flex gap-2">
                        <Link
                            className="btn btn-outline btn-sm"
                            href={`/songs/${song.id}/edit`}
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
                                    router.delete(
                                        route("songs.destroy", song.id)
                                    );
                                }
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-error btn-sm"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
