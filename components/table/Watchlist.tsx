import {
    Badge,
    Button,
    Popconfirm,
    TablePaginationConfig,
} from "antd";
import React from "react";
import { AuctionRecord, PersistedWatchlists } from "../../interfaces";
import { WatchTable } from ".";
import * as ls from "local-storage";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { DeleteRowOutlined, SettingOutlined } from "@ant-design/icons";
import { updateWatchlistLocalstorage } from "../utils";

type Props = {
    auctions: AuctionRecord[] | undefined;
    id: string;
    alertIfAbovePrice?: number;
    revalidate: () => Promise<boolean>;
    deleteWatchlist: () => void;
    openSettingsModal: () => void;
};

export const Watchlist: React.FunctionComponent<Props> = (props: Props) => {
    const {
        id,
        deleteWatchlist,
        revalidate,
        openSettingsModal,
        ...forwardProps
    } = props;

    const [pagination, setPagination] = React.useState<TablePaginationConfig>(
        {}
    );
    const [filters, setFilters] = React.useState<
        Record<string, FilterValue | null>
    >({});
    const [sorters, setSorters] = React.useState<SorterResult<AuctionRecord>>();

    const [isValidating, setIsValidating] = React.useState(false);

    const persisted = React.useMemo(() => {
        return (ls.get("watchlists") as PersistedWatchlists | undefined)?.[id];
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

    return (
        <>
            <WatchTable
                {...forwardProps}
                revalidate={revalidateWrapper}
                isValidating={isValidating}
                additionalButtons={
                    <>
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
                clearFilters={() => setFilters({})}
                onTableChange={(pagination, filters, sorters) => {
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
            />
        </>
    );
};
