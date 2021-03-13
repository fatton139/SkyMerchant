import Modal from "antd/lib/modal/Modal";
import React from "react";
import useSWR from "swr";
import { AuctionRecord, AuctionResponse } from "../../interfaces";
import { postFetcher } from "../../utils/fetcher";
import { WatchTable } from "../Table";

export const MainView: React.FunctionComponent = () => {
    const [watchingRecords, setWatchingRecords] = React.useState<number[]>([]);
    const [watchModalVisible, setWatchModalVisible] = React.useState<boolean>(
        false
    );

    const { data, error, revalidate, isValidating } = useSWR<AuctionResponse>(
        "https://run.mocky.io/v3/9fc59513-2562-4a57-b135-73c5d4d086ed",
        postFetcher
    );

    return (
        <>
            <WatchTable
                setWatchingRecords={setWatchingRecords}
                setWatchModalVisible={setWatchModalVisible}
                auctions={data?.auctions}
                revalidate={revalidate}
                isValidating={isValidating}
            />
            <Modal
                visible={watchModalVisible}
                onCancel={() => setWatchModalVisible(false)}
                onOk={() => setWatchModalVisible(false)}
            >
                NOT IMPLEMENTED CUS NO UNIQUE ID LOL.
            </Modal>
        </>
    );
};
