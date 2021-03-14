import React from "react";
import useSWR from "swr";
import { AuctionResponse, AUCTION_ENDPOINT } from "../../interfaces";
import { REVALIDATION_INTERVAL_SECONDS } from "../consts";
import { getFetcher } from "../utils/fetcher";

export const useRepeatingSWR = (
    refreshIntervalSeconds: number = REVALIDATION_INTERVAL_SECONDS
): {
    data?: AuctionResponse;
    revalidate: () => Promise<boolean>;
    isValidating: boolean;
} => {
    const { data, revalidate, isValidating } = useSWR<AuctionResponse>(
        AUCTION_ENDPOINT,
        getFetcher
    );

    React.useEffect(() => {
        const intervalRef = setInterval(() => {
            revalidate();
        }, 1000 * refreshIntervalSeconds);
        return () => {
            clearInterval(intervalRef);
        };
    }, []);

    return { data, revalidate, isValidating };
};
