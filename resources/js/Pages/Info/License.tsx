import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";

function License() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">
                Music Licensing Terms (that copilot wrote)
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Standard Game Development License
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">$49.99 per track</h3>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>One-time payment for perpetual use</li>
                        <li>Use in one commercial game project</li>
                        <li>Up to 100,000 copies/downloads</li>
                        <li>Must include attribution in game credits</li>
                        <li>No modifications allowed</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Premium Commercial License
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">
                        $199.99 per track
                    </h3>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Unlimited copies/downloads</li>
                        <li>Use in multiple projects</li>
                        <li>Modifications allowed</li>
                        <li>Commercial use in games, videos, and streaming</li>
                        <li>Attribution appreciated but not required</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Terms & Conditions
                </h2>
                <div className="prose">
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Licenses are non-transferable</li>
                        <li>
                            You cannot resell or redistribute the music as
                            standalone files
                        </li>
                        <li>
                            You cannot claim ownership of the original music
                        </li>
                        <li>
                            The original artist retains all rights to the music
                        </li>
                        <li>License is valid from the date of purchase</li>
                    </ul>
                </div>
            </section>

            <section className="text-sm text-gray-600 mt-8">
                <p>
                    For custom licensing options or questions, please contact
                    our licensing team.
                </p>
                <p>All rights reserved © {new Date().getFullYear()} BuyMusic</p>
            </section>
        </div>
    );
}

export default withRoleBasedLayout(License);
