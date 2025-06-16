import { Head } from "@inertiajs/react";
import { PageProps, Song } from "@/types";
import { useState, useEffect } from "react";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import SongCard from "@/Components/Songs/SongCard";
import debounce from "lodash/debounce";

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

    // Debounced search function
    const debouncedSearch = debounce((value: string) => {
        // This will trigger a page reload with the new search parameter
        window.location.href = route("songs.index", {
            search: value,
            genre: selectedGenre,
            sort: sortBy,
        });
    }, 500);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    // Handle genre change
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedGenre(value);
        window.location.href = route("songs.index", {
            search: searchQuery,
            genre: value,
            sort: sortBy,
        });
    };

    // Handle sort change
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortBy(value);
        window.location.href = route("songs.index", {
            search: searchQuery,
            genre: selectedGenre,
            sort: value,
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
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search songs or artists..."
                                        className="input input-bordered w-full"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <select
                                        className="select select-bordered"
                                        value={selectedGenre}
                                        onChange={handleGenreChange}
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
                                        onChange={handleSortChange}
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Songs Grid */}
                    <div className="grid grid-cols-1 px-20 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {songs.data.map((song) => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRoleBasedLayout(Index);
