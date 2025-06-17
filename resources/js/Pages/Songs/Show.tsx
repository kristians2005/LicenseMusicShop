import { Head } from "@inertiajs/react";
import { PageProps, Song } from "@/types";
import WaveForm from "@/Components/Songs/waveSurfer";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    PlayIcon,
    ShoppingCartIcon,
    ClockIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";

interface Props extends PageProps {
    song?: Song;
}

function Show({ song }: Props) {
    if (!song) return null;
    const [isPlaying, setIsPlaying] = useState(false);
    console.log(song);

    return (
        <>
            <Head title={`${song.name} by ${song.artist}`} />
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto px-4 py-8">
                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Song Info and Player */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Song Info Card */}
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Cover Image */}
                                        <div className="w-full md:w-64 h-64 rounded-lg shadow-lg justify-center items-center bg-base-300 flex">
                                            {song.cover && (
                                                <img
                                                    className=""
                                                    src={
                                                        song.cover.startsWith(
                                                            "/"
                                                        )
                                                            ? song.cover
                                                            : `/${song.cover}`
                                                    }
                                                />
                                            )}
                                        </div>

                                        {/* Song Details */}
                                        <div className="flex-1">
                                            <h1 className="text-3xl font-bold mb-2">
                                                {song.name}
                                            </h1>
                                            <h2 className="text-xl text-base-content/80 mb-4">
                                                by {song.artist}
                                            </h2>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {song.genres.map((genre) => (
                                                    <span
                                                        key={genre.id}
                                                        className="badge badge-primary"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-6 text-base-content/70">
                                                <div className="flex items-center gap-2">
                                                    <ClockIcon className="w-5 h-5" />
                                                    <span>{song.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Audio Player Card */}
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title mb-4">Preview</h3>
                                    <WaveForm
                                        audioUrl={
                                            song.file
                                                ? song.file.startsWith("/")
                                                    ? song.file
                                                    : `/${song.file}`
                                                : ""
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Purchase */}
                        <div className="space-y-6">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title mb-4">
                                        Purchase
                                    </h3>
                                    <div className="text-3xl font-bold text-primary mb-6">
                                        ${Number(song.price).toFixed(2)}
                                    </div>
                                    <button className="btn btn-primary w-full">
                                        {/* <ShoppingCartIcon className="w-5 h-5 mr-2" /> */}
                                        Buy
                                    </button>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title mb-4">Details</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-1">
                                                Duration
                                            </h4>
                                            <p className="text-base-content/70">
                                                {song.duration}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">
                                                Artist
                                            </h4>
                                            <p className="text-base-content/70">
                                                {song.artist}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">
                                                Genres
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {song.genres.map((genre) => (
                                                    <span
                                                        key={genre.id}
                                                        className="badge badge-primary"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRoleBasedLayout(Show);
