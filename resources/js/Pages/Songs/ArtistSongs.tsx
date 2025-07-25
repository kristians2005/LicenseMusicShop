import ArtistSongCard from "@/Components/Songs/ArtistSongCard";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import { Link } from "@inertiajs/react";
import { div } from "framer-motion/client";

function ArtistSongs({ songs }: { songs?: any }) {
    console.log("songs", songs);

    return (
        <div className="flex flex-col items-center min-h-screen bg-base-200">
            <div className="grid my-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-2 sm:px-4">
                {songs.data.map((song: any) => (
                    <ArtistSongCard key={song.id} song={song} />
                ))}
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
        </div>
    );
}

export default withRoleBasedLayout(ArtistSongs);
