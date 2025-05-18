"use client";

import { useEffect, useRef } from "react";
import { debounce } from "lodash";

export function useAutoSave<T>({ data, onSave, interval = 30000 }: { data: T; onSave: (data: T) => Promise<void>; interval?: number }) {
    const dataRef = useRef(data);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(() => {
        const debouncedSave = debounce(async () => {
            try {
                await onSave(dataRef.current);
            } catch (error) {
                console.error("Auto-save failed:", error);
            }
        }, interval);

        const timer = setInterval(debouncedSave, interval);

        return () => {
            debouncedSave.cancel();
            clearInterval(timer);
        };
    }, [interval, onSave]);
}
