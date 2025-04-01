import WaveForm from "@/Components/Songs/waveSurfer";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Link } from "@inertiajs/react";

const Welcome: React.FC<PageProps> = ({ auth }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSong, setSelectedSong] = useState<string | null>(null);

    return (
        <>
            <Head title="Welcome to BuyMusic" />
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-primary mb-4">
                            Welcome to BuyMusic
                        </h1>
                        <p className="text-lg text-base-content">
                            Discover and purchase amazing music
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="join w-full">
                            <input
                                type="text"
                                placeholder="Search for songs, artists, or genres..."
                                className="input input-bordered join-item w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-primary join-item">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Browse Songs</h2>
                                <p>
                                    Explore our collection of high-quality music
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        href="/songs"
                                        className="btn btn-primary"
                                    >
                                        Browse
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">For Artists</h2>
                                <p>
                                    Upload and sell your music to a global
                                    audience
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        href="/songs/create"
                                        className="btn btn-primary"
                                    >
                                        Upload
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">About Us</h2>
                                <p>Learn more about our platform and mission</p>
                                <div className="card-actions justify-end">
                                    <Link
                                        href="/about"
                                        className="btn btn-primary"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedSong && (
                        <div className="max-w-2xl mx-auto">
                            <WaveForm audioUrl={selectedSong} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default withRoleBasedLayout(Welcome);
