import { DeleteRowOutlined, SettingOutlined } from "@ant-design/icons";
import { Badge, Button, Popconfirm, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import * as ls from "local-storage";
import React from "react";
import { WatchTable } from ".";
import { AuctionRecord, PersistedWatchlists } from "../../interfaces";
import { LOCAL_STORAGE_WATCHLIST_KEY } from "../consts";
import { updateWatchlistLocalstorage } from "../utils";

type Props = {
    auctions: AuctionRecord[] | undefined;
    id: string;
    alertIfAbovePrice?: number;
    revalidate: () => Promise<boolean>;
    deleteWatchlist: () => void;
    openSettingsModal: () => void;
    getMatchingRecords: () => AuctionRecord[];
    setDataAfterFilter: (data: AuctionRecord[]) => void;
};

export const Watchlist: React.FunctionComponent<Props> = (props: Props) => {
    const {
        id,
        deleteWatchlist,
        revalidate,
        openSettingsModal,
        auctions,
        getMatchingRecords,
        setDataAfterFilter,
        ...forwardProps
    } = props;

    const [showOnlyMatching, setShowOnlyMatching] = React.useState<boolean>(
        false
    );

    const [pagination, setPagination] = React.useState<TablePaginationConfig>(
        {}
    );
    const [filters, setFilters] = React.useState<
        Record<string, FilterValue | null>
    >({});
    const [sorters, setSorters] = React.useState<SorterResult<AuctionRecord>>();

    const [isValidating, setIsValidating] = React.useState(false);

    const persisted = React.useMemo(() => {
        return (ls.get(LOCAL_STORAGE_WATCHLIST_KEY) as
            | PersistedWatchlists
            | undefined)?.[id];
    }, []);

    const revalidateWrapper = async () => {
        setIsValidating(true);
        await props.revalidate();
        setIsValidating(false);
    };

    React.useEffect(() => {
        setPagination(persisted?.pagination || {});
        setFilters(persisted?.filters || {});
        setSorters(persisted?.sorters);
    }, [persisted]);

    const clearAllFilters = () => {
        setFilters({});
        updateWatchlistLocalstorage(props.id, "filters", {});
    };

    return (
        <>
            <WatchTable
                {...forwardProps}
                auctions={showOnlyMatching ? getMatchingRecords() : auctions}
                revalidate={revalidateWrapper}
                isValidating={isValidating}
                additionalButtons={
                    <>
                        <Button
                            icon={<SettingOutlined />}
                            onClick={() => {
                                setShowOnlyMatching((prev) => !prev);
                            }}
                        >
                            {`Show ${showOnlyMatching ? "all" : "matched"}`}
                        </Button>
                        <Badge dot={props.alertIfAbovePrice === undefined}>
                            <Button
                                icon={<SettingOutlined />}
                                onClick={openSettingsModal}
                            >
                                Settings
                            </Button>
                        </Badge>
                        <Popconfirm
                            title="Are you sure you want to delete this watchlist?"
                            onConfirm={deleteWatchlist}
                            placement="topRight"
                        >
                            <Button icon={<DeleteRowOutlined />} danger>
                                Delete
                            </Button>
                        </Popconfirm>
                    </>
                }
                pagination={pagination}
                filters={filters}
                sorters={sorters}
                clearFilters={clearAllFilters}
                onTableChange={(pagination, filters, sorters, extra) => {
                    setPagination(pagination);
                    setFilters(filters);
                    setSorters(sorters as SorterResult<AuctionRecord>);
                    updateWatchlistLocalstorage(
                        props.id,
                        "pagination",
                        pagination
                    );
                    updateWatchlistLocalstorage(props.id, "filters", filters);
                    updateWatchlistLocalstorage(
                        props.id,
                        "sorters",
                        sorters as SorterResult<AuctionRecord>
                    );
                }}
                setDataAfterFilter={setDataAfterFilter}
            />
        </>
    );
};
