// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { AuctionRecord } from "./types";

type BaseResponse = {
    success: boolean;
};

export type AuctionResponse = BaseResponse & {
    auctions: AuctionRecord[];
    totalAuctions: number;
    totalPages: number;
    page: number;
};
