import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveFormProps {
    audioUrl: string;
}

const WaveForm: React.FC<WaveFormProps> = ({ audioUrl }) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);

    useEffect(() => {
        if (waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "#4F4A85",
                progressColor: "#383351",
                height: 100,
                width: 500,
                cursorWidth: 1,
            });

            wavesurfer.current.load(audioUrl);

            return () => {
                if (wavesurfer.current) {
                    wavesurfer.current.destroy();
                }
            };
        }
    }, [audioUrl]);

    const handlePlayPause = () => {
        if (wavesurfer.current) {
            wavesurfer.current.playPause();
        }
    };

    return (
        <div>
            <div ref={waveformRef} />
            <button onClick={handlePlayPause}>Play/Pause</button>
        </div>
    );
};

export default WaveForm;
