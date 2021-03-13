import { Button, TablePaginationConfig } from "antd";
import React from "react";
import { AuctionRecord, PersistedWatchlists } from "../../interfaces";
import { WatchTable } from ".";
import * as ls from "local-storage";
import { FilterValue, SorterResult } from "antd/lib/table/interface";

type Props = {
    auctions: AuctionRecord[] | undefined;
    revalidate: () => Promise<boolean>;
    isValidating: boolean;
    deleteWatchlist: (key: string) => void;
    id: string;
};

export const Watchlist: React.FunctionComponent<Props> = (props: Props) => {
    const { id, deleteWatchlist, ...forwardProps } = props;

    const [pagination, setPagination] = React.useState<TablePaginationConfig>(
        {}
    );
    const [filters, setFilters] = React.useState<
        Record<string, FilterValue | null>
    >({});
    const [sorters, setSorters] = React.useState<SorterResult<AuctionRecord>>();

    const persisted = React.useMemo(() => {
        return (ls.get("watchlists") as PersistedWatchlists | undefined)?.[id];
    }, []);

    React.useEffect(() => {
        setPagination(persisted?.pagination || {});
        setFilters(persisted?.filters || {});
        setSorters(persisted?.sorters);
    }, [persisted]);

    return (
        <WatchTable
            {...forwardProps}
            additionalButtons={
                <Button danger onClick={() => deleteWatchlist(id)}>
                    Delete
                </Button>
            }
            pagination={pagination}
            filters={filters}
            sorters={sorters}
            onTableChange={(pagination, filters, sorters) => {
                setPagination(pagination);
                setFilters(filters);
                setSorters(sorters as SorterResult<AuctionRecord>);
                const existing = ls.get("watchlists") as
                    | PersistedWatchlists
                    | undefined;
                if (existing) {
                    ls.set("watchlists", {
                        ...existing,
                        [id]: {
                            pagination,
                            filters,
                            sorters,
                        },
                    });
                } else {
                    ls.set("watchlists", {
                        [id]: {
                            pagination,
                            filters,
                            sorters,
                        },
                    });
                }
            }}
        />
    );
};
