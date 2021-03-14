import * as ls from "local-storage";
import { PersistedWatchlists, WatchList } from "../../interfaces";

export const updateWatchlistLocalstorage = <
    T extends WatchList,
    K extends keyof WatchList
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
