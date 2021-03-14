import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";

export type AuctionRecord = {
    key: number;
    bin: boolean;
    start: number;
    end: number;
    auctioneer: string;
    category:
        | "weapon"
        | "armor"
        | "accessories"
        | "consumables"
        | "blocks"
        | "misc";
    claimed: boolean;
    highest_bid_amount: number;
    id: number;
    item_lore: string;
    item_name: string;
    tier:
        | "COMMON"
        | "UNCOMMON"
        | "RARE"
        | "EPIC"
        | "LEGENDARY"
        | "MYTHIC"
        | "SPECIAL"
        | "VERY SPECIAL";
    uuid: string;
};

export type WatchList = {
    name: string;
    alertIfAbovePrice: number | undefined;
};

export type PersistedWatchlistData = WatchList & {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorters: SorterResult<AuctionRecord>;
};

export type PersistedWatchlists = {
    [key: string]: PersistedWatchlistData;
};
