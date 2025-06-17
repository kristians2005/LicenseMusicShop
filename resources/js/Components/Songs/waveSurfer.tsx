import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveFormProps {
    audioUrl: string;
}

const WaveForm: React.FC<WaveFormProps> = ({ audioUrl }) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "#a5b4fc",
                progressColor: "#6366f1",
                height: 64,
                barWidth: 2,
                barRadius: 2,
                // responsive: true,
                cursorWidth: 2,
                cursorColor: "#6366f1",
                normalize: true,
            });

            wavesurfer.current.load(audioUrl);

            wavesurfer.current.on("play", () => setIsPlaying(true));
            wavesurfer.current.on("pause", () => setIsPlaying(false));
            wavesurfer.current.on("finish", () => setIsPlaying(false));
            wavesurfer.current.on("audioprocess", () => {
                setProgress(wavesurfer.current?.getCurrentTime() || 0);
            });
            wavesurfer.current.on("seeking", () => {
                setProgress(wavesurfer.current?.getCurrentTime() || 0);
            });

            return () => {
                wavesurfer.current?.destroy();
            };
        }
    }, [audioUrl]);

    const handlePlayPause = () => {
        if (wavesurfer.current) {
            wavesurfer.current.playPause();
        }
    };

    return (
        <div className="rounded-xl bg-base-200 p-4 shadow flex flex-col items-center gap-4">
            <div className="w-full" ref={waveformRef} />
            <div className="flex items-center gap-4 w-full">
                <button
                    onClick={handlePlayPause}
                    className="btn btn-primary btn-circle"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        // Pause icon
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <rect
                                x="6"
                                y="5"
                                width="4"
                                height="14"
                                rx="1"
                                fill="currentColor"
                            />
                            <rect
                                x="14"
                                y="5"
                                width="4"
                                height="14"
                                rx="1"
                                fill="currentColor"
                            />
                        </svg>
                    ) : (
                        // Play icon
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <polygon
                                points="6,4 20,12 6,20"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                </button>
                {/* Progress bar */}
                <div className="flex-1 h-2 bg-base-300 rounded-full overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all"
                        style={{
                            width:
                                wavesurfer.current &&
                                wavesurfer.current.getDuration()
                                    ? `${
                                          (progress /
                                              wavesurfer.current.getDuration()) *
                                          100
                                      }%`
                                    : "0%",
                        }}
                    />
                </div>
                {/* Time */}
                <span className="text-xs text-base-content/70 min-w-[48px] text-right">
                    {wavesurfer.current
                        ? `${Math.floor(progress / 60)
                              .toString()
                              .padStart(2, "0")}:${Math.floor(progress % 60)
                              .toString()
                              .padStart(2, "0")}`
                        : "00:00"}
                </span>
            </div>
        </div>
    );
};

export default WaveForm;
