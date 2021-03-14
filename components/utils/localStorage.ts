import * as ls from "local-storage";
import { PersistedWatchlistData, PersistedWatchlists } from "../../interfaces";
import { LOCAL_STORAGE_WATCHLIST_KEY } from "../consts";

export const updateWatchlistLocalstorage = <
    T extends PersistedWatchlistData,
    K extends keyof PersistedWatchlistData
>(
    key: string,
    objectKey: K,
    value: T[K]
) => {
    const existing = ls.get(LOCAL_STORAGE_WATCHLIST_KEY) as
        | PersistedWatchlists
        | undefined;
    if (existing) {
        ls.set(LOCAL_STORAGE_WATCHLIST_KEY, {
            ...existing,
            [key]: {
                ...existing[key],
                [objectKey]: value,
            },
        });
    } else {
        ls.set(LOCAL_STORAGE_WATCHLIST_KEY, {
            [key]: {
                [objectKey]: value,
            },
        });
    }
};
