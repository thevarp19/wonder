import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("ru-RU").format(price);
}

export function ensureArray(input: any): any[] {
    return Array.isArray(input) ? input : ([input] as any[]);
}

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const isArrayEmpty = (array: any): boolean => {
    return array?.length === 0;
};

export const doIfWindowExists = <T>(action: () => T): T | null => {
    if (window !== undefined) {
        return action();
    }
    return null;
};

export const tryWithErrorLog = <T>(action: () => T): T | null => {
    try {
        return action();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export function padNumbers(num: number, length: number) {
    let numStr = num.toString();
    while (numStr.length < length) {
        numStr = "0" + numStr;
    }
    return numStr;
}

import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};
