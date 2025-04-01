import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import UploadSongFile from "./Partials/UploadSongFile";
import SongCardPrototype from "./Partials/SongCardPrototype";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import axios from "axios";

interface Genre {
    id: number;
    name: string;
}

interface FormData {
    name: string;
    artist: string;
    duration: string;
    file: File | null;
    cover: File | null;
    genres: number[];
    is_private: boolean;
    price: string;
}

function Create({ genres = [] }: PageProps) {
    const [isDirty, setIsDirty] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [audioDuration, setAudioDuration] = useState<string>("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string>(
        "/images/icons/person.svg"
    );
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            name: "",
            artist: "",
            duration: "",
            file: null,
            cover: null,
            genres: [],
            is_private: false,
            price: "0",
        });

    // // Add warning when trying to leave/refresh
    // useEffect(() => {
    //     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    //         if (isDirty) {
    //             e.preventDefault();
    //             e.returnValue = "";
    //             return "";
    //         }
    //     };

    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, [isDirty]);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setData("file", file);
        setIsDirty(true);

        // Get audio duration
        const audio = new Audio(URL.createObjectURL(file));
        audio.addEventListener("loadedmetadata", () => {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60);
            setAudioDuration(
                `${minutes}:${seconds.toString().padStart(2, "0")}`
            );
            setData(
                "duration",
                `${minutes}:${seconds.toString().padStart(2, "0")}`
            );
        });
    };

    const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            setData("cover", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("artist", data.artist);
        formData.append("duration", data.duration);
        formData.append("price", data.price);
        formData.append("is_private", data.is_private ? "1" : "0");

        // Append genres as an array
        data.genres.forEach((genreId) => {
            formData.append("genres[]", genreId.toString());
        });

        // Append the audio file
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        // Append the cover image if exists
        if (coverImage) {
            formData.append("cover", coverImage);
        }

        // Send the form data using axios
        axios
            .post(route("songs.store"), formData, {})
            .then(() => {
                reset();
                setSelectedFile(null);
                setAudioDuration("");
                setCoverImage(null);
                setCoverPreview("/images/icons/person.svg");
                setIsDirty(false);
                setShowSuccess(true);
            })
            .catch((error) => {
                console.error("Upload failed:", error);
                if (error.response?.data?.errors) {
                    // Handle validation errors
                    const errorMessages = Object.values(
                        error.response.data.errors
                    ).flat();
                    alert(errorMessages.join("\n"));
                } else if (error.response?.data?.message) {
                    // Handle other server errors
                    alert(error.response.data.message);
                } else {
                    alert("Failed to upload song. Please try again.");
                }
            });
    };

    if (showSuccess) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
                    <div className="card-body text-center">
                        <div className="flex justify-center mb-4">
                            <svg
                                className="w-16 h-16 text-success"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            Song Uploaded Successfully!
                        </h2>
                        <p className="text-base-content/70 mb-6">
                            Your song has been uploaded and is now available in
                            the store.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/" className="btn btn-primary">
                                Go to Homepage
                            </Link>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="btn btn-ghost"
                            >
                                Upload Another Song
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">
                    Upload Your Song
                </h1>
                <p className="text-base-content/70">
                    Share your music with the world
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {!selectedFile && (
                    <UploadSongFile onFileSelect={handleFileSelect} />
                )}
                {selectedFile && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <SongCardPrototype
                                        title={selectedFile.name}
                                        artist={data.artist || "Unknown Artist"}
                                        albumCover={coverPreview}
                                        onPlay={() => {}}
                                    />
                                    <div className="mt-4">
                                        <label className="label cursor-pointer justify-start gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleCoverSelect}
                                                className="hidden"
                                            />
                                            <span className="btn btn-outline btn-sm">
                                                Change Cover Image
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="form-control">
                                        <label htmlFor="name" className="label">
                                            <span className="label-text">
                                                Song Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="input input-bordered w-full"
                                            required
                                        />
                                        {errors.name && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.name}
                                                </span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label
                                            htmlFor="artist"
                                            className="label"
                                        >
                                            <span className="label-text">
                                                Artist Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="artist"
                                            value={data.artist}
                                            onChange={(e) =>
                                                setData(
                                                    "artist",
                                                    e.target.value
                                                )
                                            }
                                            className="input input-bordered w-full"
                                            required
                                        />
                                        {errors.artist && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.artist}
                                                </span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label
                                            htmlFor="duration"
                                            className="label"
                                        >
                                            <span className="label-text">
                                                Duration
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="duration"
                                            value={audioDuration}
                                            readOnly
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label
                                            htmlFor="price"
                                            className="label"
                                        >
                                            <span className="label-text">
                                                Price (USD)
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            className="input input-bordered w-full"
                                            min="0"
                                            step="0.01"
                                        />
                                        {errors.price && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.price}
                                                </span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label cursor-pointer justify-start gap-2">
                                            <input
                                                type="checkbox"
                                                checked={data.is_private}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_private",
                                                        e.target.checked
                                                    )
                                                }
                                                className="checkbox checkbox-primary"
                                            />
                                            <span className="label-text">
                                                Make this song private
                                            </span>
                                        </label>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">
                                                Genres
                                            </span>
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {genres.map((genre) => (
                                                <label
                                                    key={genre.id}
                                                    className="label cursor-pointer justify-start gap-2"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={data.genres.includes(
                                                            genre.id
                                                        )}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.checked
                                                            ) {
                                                                setData(
                                                                    "genres",
                                                                    [
                                                                        ...data.genres,
                                                                        genre.id,
                                                                    ]
                                                                );
                                                            } else {
                                                                setData(
                                                                    "genres",
                                                                    data.genres.filter(
                                                                        (id) =>
                                                                            id !==
                                                                            genre.id
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                        className="checkbox checkbox-primary"
                                                    />
                                                    <span className="label-text">
                                                        {genre.name}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.genres && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.genres}
                                                </span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-6">
                                        <Link
                                            href="/"
                                            className="btn btn-ghost"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="btn btn-primary"
                                        >
                                            {processing ? (
                                                <>
                                                    <span className="loading loading-spinner loading-sm"></span>
                                                    Uploading...
                                                </>
                                            ) : (
                                                "Upload Song"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default withRoleBasedLayout(Create);
