import React from "react";
import useSWR from "swr";
import { AuctionResponse } from "../../interfaces";
import { postFetcher } from "../../utils/fetcher";
import { REVALIDATION_INTERVAL_SECONDS } from "../consts";

export const useRepeatingSWR = (
    refreshIntervalSeconds: number = REVALIDATION_INTERVAL_SECONDS
): {
    data?: AuctionResponse;
    revalidate: () => Promise<boolean>;
} => {
    const { data, revalidate } = useSWR<AuctionResponse>(
        "https://run.mocky.io/v3/cf4e8467-5355-49da-b2a6-69625d0f2883",
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
