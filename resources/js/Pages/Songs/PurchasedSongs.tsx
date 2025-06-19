import ArtistSongCard from "@/Components/Songs/ArtistSongCard";
import PurchasedSongCard from "@/Components/Songs/PurchasedSongCard";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import { Link } from "@inertiajs/react";

function PurchasedSongs({ songs }: { songs?: any }) {
    return (
        <div className="flex flex-col items-center min-h-screen bg-base-200">
            <div className="text-center my-10">
                <h1 className="text-2xl font-bold text-primary mb-4">
                    Your Purchased Songs
                </h1>
                <p className="text-base-content/70">
                    Here are the songs you have purchased. You can download them
                    anytime.
                </p>
            </div>
            <div className="join">
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
            <div className="grid my-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-2 sm:px-4">
                {songs.data.map((song: any) => (
                    <PurchasedSongCard key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
}

export default withRoleBasedLayout(PurchasedSongs);
