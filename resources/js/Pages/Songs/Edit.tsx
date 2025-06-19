import { useForm } from "@inertiajs/react";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import { PageProps, Song, Genre } from "@/types";
import { useState } from "react";

interface EditProps extends PageProps {
    song: Song;
    genres: Genre[];
}

function Edit({ song, genres }: EditProps) {
    const [coverPreview, setCoverPreview] = useState<string>(
        song.cover?.startsWith("/") ? song.cover : `/${song.cover}`
    );

    const { data, setData, post, processing, errors } = useForm({
        name: song.name,
        artist: song.artist,
        duration: song.duration,
        price: song.price,
        is_private: song.is_private,
        genres: song.genres.map((g) => g.id),
        cover: null as File | null,
        file: null as File | null,
    });

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("cover", file);
            const reader = new FileReader();
            reader.onloadend = () => setCoverPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("file", file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("songs.update", song.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Song</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-xl mx-auto"
            >
                {/* Song Name */}
                <div className="form-control">
                    <label className="label">Song Name</label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    {errors.name && (
                        <span className="text-error text-xs">
                            {errors.name}
                        </span>
                    )}
                </div>
                {/* Artist */}
                <div className="form-control">
                    <label className="label">Artist</label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={data.artist}
                        onChange={(e) => setData("artist", e.target.value)}
                        required
                    />
                    {errors.artist && (
                        <span className="text-error text-xs">
                            {errors.artist}
                        </span>
                    )}
                </div>
                {/* Duration */}
                <div className="form-control">
                    <label className="label">Duration</label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={data.duration}
                        onChange={(e) => setData("duration", e.target.value)}
                        required
                    />
                    {errors.duration && (
                        <span className="text-error text-xs">
                            {errors.duration}
                        </span>
                    )}
                </div>
                {/* Price */}
                <div className="form-control">
                    <label className="label">Price</label>
                    <input
                        type="number"
                        className="input input-bordered"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        min={0}
                        step="0.01"
                        required
                    />
                    {errors.price && (
                        <span className="text-error text-xs">
                            {errors.price}
                        </span>
                    )}
                </div>
                {/* Private */}
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={data.is_private}
                            onChange={(e) =>
                                setData("is_private", e.target.checked)
                            }
                        />
                        <span className="label-text ml-2">Private</span>
                    </label>
                </div>
                {/* Genres */}
                <div className="form-control">
                    <label className="label">Genres</label>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <label
                                key={genre.id}
                                className="label cursor-pointer gap-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={data.genres.includes(genre.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData("genres", [
                                                ...data.genres,
                                                genre.id,
                                            ]);
                                        } else {
                                            setData(
                                                "genres",
                                                data.genres.filter(
                                                    (id) => id !== genre.id
                                                )
                                            );
                                        }
                                    }}
                                    className="checkbox checkbox-primary"
                                />
                                <span className="label-text">{genre.name}</span>
                            </label>
                        ))}
                    </div>
                    {errors.genres && (
                        <span className="text-error text-xs">
                            {errors.genres}
                        </span>
                    )}
                </div>
                {/* Cover Image */}
                <div className="form-control">
                    <label className="label">Cover Image</label>
                    <div className="flex items-center gap-4">
                        <img
                            src={coverPreview}
                            alt="Cover Preview"
                            className="w-24 h-24 object-cover rounded"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverChange}
                        />
                    </div>
                    {errors.cover && (
                        <span className="text-error text-xs">
                            {errors.cover}
                        </span>
                    )}
                </div>
                {/* Audio File */}
                <div className="form-control">
                    <label className="label">Audio File</label>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                    />
                    {errors.file && (
                        <span className="text-error text-xs">
                            {errors.file}
                        </span>
                    )}
                </div>
                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={processing}
                    >
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default withRoleBasedLayout(Edit);
