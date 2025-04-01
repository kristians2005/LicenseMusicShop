import React, { useState, useEffect } from "react";
import axios from "axios";
import withRoleBasedLayout from "@/HOCs/withRoleBasedLayout";
import UploadSongFile from "./Partials/UploadSongFile";
import SongCardPrototype from "./Partials/SongCardPrototype";

function Create() {
    const [isDirty, setIsDirty] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        console.log(file);

        setSelectedFile(file);
        setIsDirty(true);
    };

    return (
        <div>
            <form action="">
                {!selectedFile && (
                    <UploadSongFile onFileSelect={handleFileSelect} />
                )}
                {selectedFile && (
                    <div>
                        <div className=" bg-white flex flex-row justify-center">
                            <div>
                                <p>Selected file: {selectedFile.name}</p>
                                <p>
                                    File size:{" "}
                                    {(
                                        selectedFile.size /
                                        (1024 * 1024)
                                    ).toFixed(2)}{" "}
                                    MB
                                </p>
                            </div>

                            <div>
                                <SongCardPrototype
                                    title={selectedFile.name}
                                    artist={selectedFile.size.toString()}
                                    albumCover="/images/icons/person.svg"
                                    onPlay={() => {}}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default withRoleBasedLayout(Create);
