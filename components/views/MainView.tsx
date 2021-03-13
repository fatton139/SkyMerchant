import Modal from "antd/lib/modal/Modal";
import React from "react";
import useSWR from "swr";
import { AuctionResponse } from "../../interfaces";
import { getFetcher } from "../../utils/fetcher";
import { WatchTable } from "../Table";

export const MainView: React.FunctionComponent = () => {
    const [watchingRecords, setWatchingRecords] = React.useState<number[]>([]);
    const [watchModalVisible, setWatchModalVisible] = React.useState<boolean>(
        false
    );

    const { data, error, revalidate, isValidating } = useSWR<AuctionResponse>(
        "https://192.168.0.103:44358/api/Auctions",
        getFetcher
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
