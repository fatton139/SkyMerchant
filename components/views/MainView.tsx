import { Modal, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import React from "react";
import { AuctionRecord, AuctionResponse } from "../../interfaces";
import { WatchTable } from "../table";

type Props = {
    data?: AuctionResponse;
    revalidate: () => Promise<boolean>;
};

export const MainView: React.FunctionComponent<Props> = (props: Props) => {
    const { data, revalidate } = props;
    const [pagination, setPagination] = React.useState<TablePaginationConfig>(
        {}
    );
    const [filters, setFilters] = React.useState<
        Record<string, FilterValue | null>
    >({});
    const [sorters, setSorters] = React.useState<SorterResult<AuctionRecord>>();
    const [, setWatchingRecords] = React.useState<number[]>([]);
    const [watchModalVisible, setWatchModalVisible] = React.useState<boolean>(
        false
    );
    const [isValidating, setIsValidating] = React.useState(false);

    const revalidateWrapper = async () => {
        setIsValidating(true);
        await revalidate();
        setIsValidating(false);
    };

    return (
        <>
            <WatchTable
                setWatchingRecords={setWatchingRecords}
                setWatchModalVisible={setWatchModalVisible}
                auctions={data?.auctions}
                revalidate={revalidateWrapper}
                isValidating={isValidating}
                pagination={pagination}
                filters={filters}
                sorters={sorters}
                clearFilters={() => setFilters({})}
                onTableChange={(pagination, filters, sorters) => {
                    setPagination(pagination);
                    setFilters(filters);
                    setSorters(sorters as SorterResult<AuctionRecord>);
                }}
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
