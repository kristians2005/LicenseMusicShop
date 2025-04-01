import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";

function About() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">
                    About BuyMusic (that copilot wrote)
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Empowering musicians to share their creativity with the
                    world through a seamless music licensing platform.
                </p>
            </section>

            {/* Mission Section */}
            <section className="mb-16">
                <div className="bg-gray-50 rounded-lg p-8">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-700">
                        BuyMusic bridges the gap between talented musicians and
                        content creators. We provide a transparent, fair, and
                        easy-to-use platform for licensing music across various
                        media projects.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 border rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">
                            For Musicians
                        </h3>
                        <ul className="space-y-2">
                            <li>✓ Fair compensation</li>
                            <li>✓ Flexible licensing options</li>
                            <li>✓ Global reach</li>
                            <li>✓ Analytics dashboard</li>
                        </ul>
                    </div>
                    <div className="p-6 border rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">
                            For Buyers
                        </h3>
                        <ul className="space-y-2">
                            <li>✓ High-quality music</li>
                            <li>✓ Clear licensing terms</li>
                            <li>✓ Competitive pricing</li>
                            <li>✓ Easy search and discovery</li>
                        </ul>
                    </div>
                    <div className="p-6 border rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">
                            Platform Features
                        </h3>
                        <ul className="space-y-2">
                            <li>✓ Secure payments</li>
                            <li>✓ 24/7 support</li>
                            <li>✓ Music preview</li>
                            <li>✓ Download history</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="text-center">
                <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                <p className="text-lg text-gray-600 mb-4">
                    Have questions? We'd love to hear from you.
                </p>
                <a
                    href="mailto:contact@buymusic.com"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Contact Us
                </a>
            </section>
        </div>
    );
}

export default withRoleBasedLayout(About);
