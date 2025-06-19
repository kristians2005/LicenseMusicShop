import WaveForm from "@/Components/Songs/waveSurfer";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Link } from "@inertiajs/react";

const Welcome: React.FC<PageProps> = ({ auth }) => {
    const [selectedSong, setSelectedSong] = useState<string | null>(null);

    // Check if user has artist or admin role
    const canUploadMusic =
        auth.user?.role === "artist" || auth.user?.role === "admin";

    return (
        <>
            <Head title="Welcome to BuyMusic" />
            <div className="min-h-screen bg-base-200">
                {/* Hero Section */}
                <div className="hero min-h-[60vh] bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl font-bold text-primary mb-8">
                                Your Music Shop
                            </h1>
                            <p className="text-xl text-base-content/80 mb-8">
                                Buy music for your needs, support artists, and
                                discover new melodies. BuyMusic is your music
                                destination.
                            </p>
                            <div className="flex gap-4 justify-center">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route("songs.index")}
                                            className="btn btn-primary"
                                        >
                                            Browse Store
                                        </Link>
                                        {canUploadMusic && (
                                            <Link
                                                href={route("songs.create")}
                                                className="btn btn-outline"
                                            >
                                                Upload Music
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route("register")}
                                            className="btn btn-primary"
                                        >
                                            Get Started
                                        </Link>
                                        <Link
                                            href={route("login")}
                                            className="btn btn-outline"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRoleBasedLayout(Welcome);
