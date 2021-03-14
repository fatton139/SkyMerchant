import { API_HOSTNAME } from "../components/consts";
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

export const AUCTION_ENDPOINT = new URL("/api/Auctions", API_HOSTNAME).href;
export const HEALTH_CHECK_ENDPOINT = new URL(
    "/api/Auctions/healthcheck",
    API_HOSTNAME
).href;
