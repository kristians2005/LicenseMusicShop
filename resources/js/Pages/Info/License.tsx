import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

function License() {
    return (
        <>
            <Head title="Music Licensing Terms" />
            <div className="min-h-screen bg-base-200">
                {/* Hero Section */}
                <div className="bg-base-100 border-b border-base-200">
                    <div className="container mx-auto px-4 py-12">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-primary mb-4">
                                Music Licensing Terms
                            </h1>
                            <p className="text-lg text-base-content max-w-2xl mx-auto">
                                Clear and transparent licensing options for your
                                creative projects. Choose the perfect license
                                for your needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    {/* License Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl">
                                    Standard License
                                </h2>
                                <div className="text-3xl font-bold text-primary mb-4">
                                    $49.99
                                    <span className="text-base font-normal text-base-content ml-2">
                                        per track
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    <li>
                                        ✓ One-time payment for perpetual use
                                    </li>
                                    <li>
                                        ✓ Use in one commercial game project
                                    </li>
                                    <li>✓ Up to 100,000 copies/downloads</li>
                                    <li>
                                        ✓ Must include attribution in credits
                                    </li>
                                    <li>✓ No modifications allowed</li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="badge badge-primary">
                                        Premium
                                    </span>
                                </div>
                                <h2 className="card-title text-2xl">
                                    Premium License
                                </h2>
                                <div className="text-3xl font-bold text-primary mb-4">
                                    $199.99
                                    <span className="text-base font-normal text-base-content ml-2">
                                        per track
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    <li>✓ Unlimited copies/downloads</li>
                                    <li>✓ Use in multiple projects</li>
                                    <li>✓ Modifications allowed</li>
                                    <li>
                                        ✓ Commercial use in games, videos, and
                                        streaming
                                    </li>
                                    <li>
                                        ✓ Attribution appreciated but not
                                        required
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Terms and Support */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Terms & Conditions
                                </h2>
                                <ul className="space-y-2">
                                    <li>✓ Licenses are non-transferable</li>
                                    <li>
                                        ✓ Cannot resell or redistribute music
                                        files
                                    </li>
                                    <li>
                                        ✓ Cannot claim ownership of original
                                        music
                                    </li>
                                    <li>
                                        ✓ Original artist retains all rights
                                    </li>
                                    <li>
                                        ✓ License valid from date of purchase
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Custom Licensing</h2>
                                <p>
                                    Need a custom license for your specific
                                    project? Contact our licensing team for
                                    tailored solutions.
                                </p>
                                <div className="card-actions justify-end">
                                    <a
                                        href="mailto:licensing@buymusic.com"
                                        className="btn btn-primary"
                                    >
                                        Contact Licensing Team
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Browse Music</h2>
                                <p>
                                    Explore our collection of high-quality music
                                    available for licensing.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        href="/songs"
                                        className="btn btn-primary"
                                    >
                                        Browse Songs
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Need Help?</h2>
                            <p>
                                Have questions about our licensing terms? Our
                                support team is here to help.
                            </p>
                            <div className="card-actions justify-end">
                                <a
                                    href="mailto:support@buymusic.com"
                                    className="btn btn-primary"
                                >
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-sm text-base-content/70 mt-12">
                        <p>
                            All rights reserved © {new Date().getFullYear()}{" "}
                            BuyMusic
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRoleBasedLayout(License);
