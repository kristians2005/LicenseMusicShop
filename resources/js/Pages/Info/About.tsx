import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

function About() {
    return (
        <>
            <Head title="About BuyMusic" />
            <div className="min-h-screen bg-base-200">
                {/* Hero Section */}
                <div className="bg-base-100 border-b border-base-200">
                    <div className="container mx-auto px-4 py-12">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-primary mb-4">
                                About BuyMusic
                            </h1>
                            <p className="text-lg text-base-content max-w-2xl mx-auto">
                                Empowering musicians to share their creativity
                                with the world through a seamless music
                                licensing platform.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    {/* Mission Section */}
                    <div className="card bg-base-100 shadow-xl mb-12">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                Our Mission
                            </h2>
                            <p className="text-lg">
                                BuyMusic bridges the gap between talented
                                musicians and content creators. We provide a
                                transparent, fair, and easy-to-use platform for
                                licensing music across various media projects.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">For Musicians</h2>
                                <p>
                                    Upload your music and reach a global
                                    audience. Get fair compensation and maintain
                                    control over your work.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        href="/songs/create"
                                        className="btn btn-primary"
                                    >
                                        Start Uploading
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">For Buyers</h2>
                                <p>
                                    Access high-quality music for your projects.
                                    Clear licensing terms and competitive
                                    pricing.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        href="/songs"
                                        className="btn btn-primary"
                                    >
                                        Browse Music
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Platform Features
                                </h2>
                                <ul className="space-y-2">
                                    <li>✓ Secure payments</li>
                                    <li>✓ 24/7 support</li>
                                    <li>✓ Music preview</li>
                                    <li>✓ Download history</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Licensing Options
                                </h2>
                                <p>
                                    Choose from various licensing options to
                                    suit your needs, from standard to premium
                                    commercial licenses.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        href={route("License")}
                                        className="btn btn-primary"
                                    >
                                        View Licenses
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Get In Touch</h2>
                                <p>
                                    Have questions? We'd love to hear from you.
                                </p>
                                <div className="card-actions justify-end">
                                    <a
                                        href="mailto:contact@buymusic.com"
                                        className="btn btn-primary"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRoleBasedLayout(About);
