import React from "react";
import useSWR from "swr";
import { AuctionResponse, AUCTION_ENDPOINT } from "../../interfaces";
import { postFetcher } from "../utils/fetcher";
import { REVALIDATION_INTERVAL_SECONDS } from "../consts";

export const useRepeatingSWR = (
    refreshIntervalSeconds: number = REVALIDATION_INTERVAL_SECONDS
): {
    data?: AuctionResponse;
    revalidate: () => Promise<boolean>;
} => {
    const { data, revalidate } = useSWR<AuctionResponse>(
        AUCTION_ENDPOINT,
        postFetcher
    );

    React.useEffect(() => {
        const intervalRef = setInterval(() => {
            revalidate();
        }, 1000 * refreshIntervalSeconds);
        return () => {
            clearInterval(intervalRef);
        };
    }, []);

    return { data, revalidate };
};
