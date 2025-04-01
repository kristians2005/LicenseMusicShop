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
                                Your Music, Your Way
                            </h1>
                            <p className="text-xl text-base-content/80 mb-8">
                                Discover, purchase, and manage your music
                                collection all in one place. Whether you're an
                                artist or a music lover, BuyMusic has something
                                for you.
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

                {/* Features Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="text-primary mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                        />
                                    </svg>
                                </div>
                                <h2 className="card-title">
                                    High-Quality Music
                                </h2>
                                <p>
                                    Access a vast collection of professionally
                                    produced music from talented artists
                                    worldwide.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="text-primary mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="card-title">Instant Access</h2>
                                <p>
                                    Download and enjoy your purchased music
                                    immediately, anywhere and anytime.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="text-primary mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="card-title">Support Artists</h2>
                                <p>
                                    Directly support independent artists by
                                    purchasing their music through our platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-primary text-primary-content py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Start Your Musical Journey?
                        </h2>
                        <p className="text-lg mb-8">
                            Join thousands of music lovers and artists on
                            BuyMusic today.
                        </p>
                        {auth.user ? (
                            <Link
                                href={route("songs.index")}
                                className="btn btn-lg"
                            >
                                Browse the Store
                            </Link>
                        ) : (
                            <Link
                                href={route("register")}
                                className="btn btn-lg"
                            >
                                Create Your Account
                            </Link>
                        )}
                    </div>
                </div>

                {selectedSong && (
                    <div className="fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-4">
                        <div className="container mx-auto">
                            <WaveForm audioUrl={selectedSong} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default withRoleBasedLayout(Welcome);
