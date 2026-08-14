import { useCallback, useEffect, useState } from "react";

const MODE_KEY = "mode";
const BASE_KEY = "base";
const ALLOWED_MODES = ["light", "dark"];
const ALLOWED_BASES = ["zinc", "slate", "neutral", "stone", "emerald"];

const getStoredValue = (key, allowed, fallback) => {
    if (typeof window === "undefined") {
        return fallback;
    }

    const stored = window.localStorage.getItem(key);
    return allowed.includes(stored) ? stored : fallback;
};

const applyTheme = (mode, base) => {
    const root = document.documentElement;
    if (!root) return;

    root.classList.toggle("dark", mode === "dark");
    root.dataset.base = base;
};

export default function useTheme() {
    const [mode, setModeState] = useState(() =>
        getStoredValue(MODE_KEY, ALLOWED_MODES, "light")
    );
    const [base, setBaseState] = useState(() =>
        getStoredValue(BASE_KEY, ALLOWED_BASES, "zinc")
    );

    useEffect(() => {
        applyTheme(mode, base);
    }, [mode, base]);

    const setMode = useCallback(
        (nextMode) => {
            const safeMode = ALLOWED_MODES.includes(nextMode)
                ? nextMode
                : "light";
            setModeState(safeMode);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(MODE_KEY, safeMode);
            }
        },
        []
    );

    const setBase = useCallback(
        (nextBase) => {
            const safeBase = ALLOWED_BASES.includes(nextBase)
                ? nextBase
                : "zinc";
            setBaseState(safeBase);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(BASE_KEY, safeBase);
            }
        },
        []
    );

    return { mode, base, setMode, setBase };
}