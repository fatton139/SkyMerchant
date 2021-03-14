import * as ls from "local-storage";
import { PersistedWatchlistData, PersistedWatchlists } from "../../interfaces";

export const updateWatchlistLocalstorage = <
    T extends PersistedWatchlistData,
    K extends keyof PersistedWatchlistData
>(
    key: string,
    objectKey: K,
    value: T[K]
) => {
    const existing = ls.get("watchlists") as PersistedWatchlists | undefined;
    if (existing) {
        ls.set("watchlists", {
            ...existing,
            [key]: {
                ...existing[key],
                [objectKey]: value,
            },
        });
    } else {
        ls.set("watchlists", {
            [key]: {
                [objectKey]: value,
            },
        });
    }
};
