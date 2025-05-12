import { createContext, useContext} from 'react';
import useSound from 'use-sound';
import themeSong from '../sounds/themeSong.mp3';
import questionSong from '../sounds/questionSound.mp3';
import checkpointSong from '../sounds/checkpointSound.mp3';

const SoundContext = createContext();

export function SoundProvider({ children }) {
    const [playTheme, { stop: stopTheme }] = useSound(themeSong, {
        volume: 0.1,
    });
    const [playQuestion, { stop: stopQuestion }] = useSound(questionSong, {
        volume: 0.1,
    });
    const [playCheckpoint, { stop: stopCheckpoint }] = useSound(checkpointSong, {
        volume: 0.1,
    })

    function stopAllSound() {
        stopQuestion();
        stopTheme();
        stopCheckpoint();
    }

    const value = {
        playTheme,
        playQuestion,
        playCheckpoint,
        stopAllSound
    };

    return (
        <SoundContext.Provider value={value}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSoundContext() {
    return useContext(SoundContext);
}