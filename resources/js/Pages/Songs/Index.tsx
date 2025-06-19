import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { PageProps, Song } from "@/types";
import { useState } from "react";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import SongCard from "@/Components/Songs/SongCard";
import { motion, AnimatePresence } from "framer-motion";

interface Genre {
    id: number;
    name: string;
}

const Index = ({ songs, genres = [], filters }: PageProps) => {
    if (!songs) return null;
    console.log("songs", songs);

    const [selectedGenre, setSelectedGenre] = useState<string>(
        filters.genre || "all"
    );
    const [sortBy, setSortBy] = useState<string>(filters.sort || "name");
    const [searchQuery, setSearchQuery] = useState<string>(
        filters.search || ""
    );

    // Handle filter submit
    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = route("songs.index", {
            search: searchQuery,
            genre: selectedGenre,
            sort: sortBy,
        });
    };

    return (
        <>
            <Head title="Songs" />
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                            Browse Songs
                        </h1>
                        <p className="text-base-content/70 text-sm sm:text-base">
                            Discover and purchase music from talented artists
                        </p>
                    </div>

                    {/* Filters */}
                    <motion.div
                        className="card bg-base-100 shadow-xl mb-6 sm:mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="card-body p-4 sm:p-6">
                            <form
                                className="flex flex-col gap-3 sm:gap-4 md:flex-row"
                                onSubmit={handleFilterSubmit}
                            >
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search songs or artists..."
                                        className="input input-bordered w-full"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                    <select
                                        className="select select-bordered w-full sm:w-auto"
                                        value={selectedGenre}
                                        onChange={(e) =>
                                            setSelectedGenre(e.target.value)
                                        }
                                    >
                                        <option value="all">All Genres</option>
                                        {genres.map((genre) => (
                                            <option
                                                key={genre.id}
                                                value={genre.name}
                                            >
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="select select-bordered w-full sm:w-auto"
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(e.target.value)
                                        }
                                    >
                                        <option value="name">
                                            Sort by Name
                                        </option>
                                        <option value="artist">
                                            Sort by Artist
                                        </option>
                                        <option value="price-asc">
                                            Price: Low to High
                                        </option>
                                        <option value="price-desc">
                                            Price: High to Low
                                        </option>
                                    </select>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full sm:w-auto"
                                    >
                                        Filter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                    <div className="join flex justify-center my-6 sm:my-8">
                        <Link
                            href={songs.prev_page_url || "#"}
                            className="join-item bg-base-100 btn"
                        >
                            «
                        </Link>
                        <button className="join-item bg-base-100 btn">
                            {songs.current_page}
                        </button>
                        <Link
                            href={songs.next_page_url || "#"}
                            className="join-item bg-base-100 btn"
                        >
                            »
                        </Link>
                    </div>
                    {/* Songs Grid with animation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        <AnimatePresence>
                            {songs.data.map((song) => (
                                <motion.div
                                    key={song.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <SongCard song={song} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="join flex justify-center mt-6 sm:mt-8">
                        <Link
                            href={songs.prev_page_url || "#"}
                            className="join-item bg-base-100 btn"
                        >
                            «
                        </Link>
                        <button className="join-item bg-base-100 btn">
                            {songs.current_page}
                        </button>
                        <Link
                            href={songs.next_page_url || "#"}
                            className="join-item bg-base-100 btn"
                        >
                            »
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRoleBasedLayout(Index);
