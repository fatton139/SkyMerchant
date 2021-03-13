import { AppstoreAddOutlined } from "@ant-design/icons";
import { Button, Divider, message } from "antd";
import produce, { enableMapSet } from "immer";
import * as ls from "local-storage";
import React from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { AuctionResponse, PersistedWatchlists } from "../../interfaces";
import { postFetcher } from "../../utils/fetcher";
import { Watchlist } from "../Table/Watchlist";

enableMapSet();

type WatchList = {};

export const WatchView = () => {
    const { data, error, revalidate, isValidating } = useSWR<AuctionResponse>(
        "https://run.mocky.io/v3/9fc59513-2562-4a57-b135-73c5d4d086ed",
        postFetcher
    );

    const [watchlists, setWatchlists] = React.useState<Map<string, WatchList>>(
        new Map()
    );

    React.useEffect(() => {
        const persisted = ls.get("watchlists") as
            | PersistedWatchlists
            | undefined;
        if (persisted) {
            setWatchlists(
                new Map(Object.keys(persisted).map((key) => [key, {}]))
            );
        }
    }, []);

    const insertWatchlist = () => {
        const key = uuidv4();
        setWatchlists(
            produce(watchlists, (draft) => {
                draft.set(key, {});
            })
        );
        const existing = ls.get("watchlists") as
            | PersistedWatchlists
            | undefined;
        if (existing) {
            ls.set("watchlists", { ...existing, [key]: {} });
        } else {
            ls.set("watchlists", { [key]: {} });
        }
        message.success("New watchlist has been added")
    };

    const deleteWatchlist = (key: string) => {
        setWatchlists(
            produce(watchlists, (draft) => {
                draft.delete(key);
            })
        );
        const existing = ls.get("watchlists") as
            | PersistedWatchlists
            | undefined;
        delete existing?.[key];
        ls.set("watchlists", existing);
    };

    return (
        <div>
            <Button icon={<AppstoreAddOutlined />} onClick={insertWatchlist}>
                New Watchlist
            </Button>
            <Divider orientation="left">Your Watchlists</Divider>
            {Array.from(watchlists.entries()).map(([key, value]) => {
                return (
                    <Watchlist
                        auctions={data?.auctions}
                        revalidate={revalidate}
                        id={key}
                        key={key}
                        deleteWatchlist={deleteWatchlist}
                    />
                );
            })}
        </div>
    );
};
