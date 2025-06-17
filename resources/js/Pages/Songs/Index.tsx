import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { PageProps, Song } from "@/types";
import { useState } from "react";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import SongCard from "@/Components/Songs/SongCard";

interface Genre {
    id: number;
    name: string;
}

const Index = ({ songs, genres = [], filters }: PageProps) => {
    if (!songs) return null;

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
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">
                            Browse Songs
                        </h1>
                        <p className="text-base-content/70">
                            Discover and purchase music from talented artists
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body">
                            <form
                                className="flex flex-col md:flex-row gap-4"
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
                                <div className="flex gap-4">
                                    <select
                                        className="select select-bordered"
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
                                        className="select select-bordered"
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
                                        className="btn btn-primary"
                                    >
                                        Filter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="join flex justify-center my-8">
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
                    {/* Songs Grid */}
                    <div className="grid grid-cols-1 px-20 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {songs.data.map((song) => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                    <div className="join flex justify-center mt-8">
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
