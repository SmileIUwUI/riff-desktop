import { invoke } from "@tauri-apps/api/core";

export interface WindowSize {
    width: number;
    height: number;
}

export const useWindow = () => {
    const setSize = async (width: number, height: number, fixed: boolean): Promise<void> => {
        try {
            if (fixed) {
                await invoke('set_fixed_window_size', { width, height });
            } else {
                await invoke('set_window_size', { width, height })
            }
        } catch (error) {
            console.error('Error resize window:', error);
            throw error;
        }
    };

    const makeResizable = async (): Promise<void> => {
        try {
            await invoke('make_window_resizable');
        } catch (error) {
            console.error('Size unblocking error:', error);
            throw error;
        }
    };

    const getScreenSize = async (): Promise<WindowSize> => {
        try {
            const screenSize = await invoke<WindowSize>('get_screen_size');
            return screenSize;
        } catch (err) {
            throw err;
        }
    };

    return {
        setSize,
        makeResizable,
        getScreenSize,
    };
};