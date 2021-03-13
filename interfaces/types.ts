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
