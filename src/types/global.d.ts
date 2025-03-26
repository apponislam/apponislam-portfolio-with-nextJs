export {};

declare global {
    interface Window {
        updateAuthSession?: (data: any) => void;
    }
}
