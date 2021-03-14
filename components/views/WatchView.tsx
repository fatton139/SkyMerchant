import { AppstoreAddOutlined } from "@ant-design/icons";
import {
    Button,
    Collapse,
    Divider,
    Empty,
    message,
    Popconfirm,
    Space,
    Tag,
    Typography,
} from "antd";
import produce, { enableMapSet } from "immer";
import * as ls from "local-storage";
import React from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import {
    AuctionRecord,
    AuctionResponse,
    PersistedWatchlists,
    WatchList,
} from "../../interfaces";
import { postFetcher } from "../../utils/fetcher";
import {
    LOCAL_STORAGE_ACTIVE_WATCHLIST_KEY,
    LOCAL_STORAGE_WATCHLIST_KEY,
} from "../consts";
import { Watchlist, WatchlistSettingsModal } from "../table";
import { updateWatchlistLocalstorage } from "../utils";

enableMapSet();

type Props = {
    data?: AuctionResponse;
    revalidate: () => Promise<boolean>;
};

export const WatchView: React.FunctionComponent<Props> = (props: Props) => {
    const { data, revalidate } = useSWR<AuctionResponse>(
        "https://run.mocky.io/v3/cf4e8467-5355-49da-b2a6-69625d0f2883",
        postFetcher
    );

    const [watchlists, setWatchlists] = React.useState<Map<string, WatchList>>(
        new Map()
    );

    const [modalData, setModalData] = React.useState<string | undefined>();
    const [activePanelKeys, setActivePanelKeys] = React.useState<string[]>([]);

    React.useEffect(() => {
        const persisted = ls.get(LOCAL_STORAGE_WATCHLIST_KEY) as
            | PersistedWatchlists
            | undefined;
        if (persisted) {
            setWatchlists(
                produce(watchlists, (draft) => {
                    Object.keys(persisted).forEach((key) => {
                        draft.set(key, {
                            name: persisted[key].name,
                            alertIfAbovePrice: persisted[key].alertIfAbovePrice,
                            dataAfterFilter: [],
                        });
                    });
                })
            );
            const persistedActivePanels = ls.get(
                LOCAL_STORAGE_ACTIVE_WATCHLIST_KEY
            ) as string[] | undefined;
            if (persistedActivePanels) {
                setActivePanelKeys(
                    persistedActivePanels.filter((k) =>
                        Object.keys(persisted).includes(k)
                    )
                );
            }
        }
    }, []);

    const insertWatchlist = () => {
        const key = uuidv4();
        const defaultName = "New watchlist";
        setWatchlists(
            produce(watchlists, (draft) => {
                draft.set(key, {
                    name: defaultName,
                    alertIfAbovePrice: undefined,
                    dataAfterFilter: [],
                });
            })
        );
        updateWatchlistLocalstorage(key, "name", defaultName);
        message.success("New watchlist has been added");
    };

    const deleteWatchlist = (key: string) => {
        setWatchlists(
            produce(watchlists, (draft) => {
                draft.delete(key);
            })
        );
        const existing = ls.get(LOCAL_STORAGE_WATCHLIST_KEY) as
            | PersistedWatchlists
            | undefined;
        const name = existing?.[key].name;
        delete existing?.[key];
        ls.set(LOCAL_STORAGE_WATCHLIST_KEY, existing);
        const activePanels =
            (ls.get(LOCAL_STORAGE_ACTIVE_WATCHLIST_KEY) as string[]) || [];
        ls.set(
            LOCAL_STORAGE_ACTIVE_WATCHLIST_KEY,
            activePanels.filter((k) => Object.keys(existing || {}).includes(k))
        );
        message.success(`Successfully deleted ${name}`);
    };

    const deleteAllWatchlists = () => {
        setWatchlists(new Map());
        setActivePanelKeys([]);
        ls.set(LOCAL_STORAGE_WATCHLIST_KEY, {});
        ls.set(LOCAL_STORAGE_ACTIVE_WATCHLIST_KEY, []);
    };

    const setDataAfterFilter = (data: AuctionRecord[], key: string) => {
        setWatchlists(
            produce(watchlists, (draft) => {
                const prev = draft.get(key);
                if (prev) {
                    draft.set(key, { ...prev, dataAfterFilter: data });
                }
            })
        );
    };

    const settingsControl = React.useCallback(() => {
        return <AppstoreAddOutlined />;
    }, []);

    const getMatchingRecords = React.useCallback((watchlist: WatchList) => {
        return watchlist.alertIfAbovePrice !== undefined
            ? watchlist.dataAfterFilter.filter((record) => {
                  return record.bid > watchlist.alertIfAbovePrice!;
              })
            : undefined;
    }, []);

    const generatePanelHeader = React.useCallback(
        (watchlist: WatchList) => {
            const matchingLength = getMatchingRecords(watchlist)?.length;
            if (watchlist.alertIfAbovePrice !== undefined) {
                return (
                    <Space>
                        <Typography.Text
                            style={{
                                display: "inline",
                            }}
                        >
                            {watchlist.name}
                        </Typography.Text>
                        <Tag color="green">{`Alert if above ${watchlist.alertIfAbovePrice}`}</Tag>
                        {matchingLength && matchingLength > 0 ? (
                            <Tag color="blue">{`${matchingLength} Matches`}</Tag>
                        ) : undefined}
                    </Space>
                );
            } else {
                return (
                    <Space>
                        <Typography.Text
                            style={{
                                display: "inline",
                            }}
                        >
                            {watchlist.name}
                        </Typography.Text>
                        <Tag>No alerts setup</Tag>
                    </Space>
                );
            }
        },
        [watchlists, props.data]
    );

    return (
        <>
            <Space>
                <Button
                    type="primary"
                    icon={<AppstoreAddOutlined />}
                    onClick={insertWatchlist}
                >
                    New Watchlist
                </Button>
                <Popconfirm
                    title="Are you sure you want to delete ALL watchlists?"
                    onConfirm={deleteAllWatchlists}
                >
                    <Button danger icon={<AppstoreAddOutlined />}>
                        Delete All
                    </Button>
                </Popconfirm>
            </Space>
            <Divider orientation="left">Your Watchlists</Divider>
            {watchlists.size === 0 ? (
                <Empty description="No Watchlists">
                    <Button type="primary" onClick={insertWatchlist}>
                        Create New Watchlist
                    </Button>
                </Empty>
            ) : (
                <Collapse
                    expandIconPosition="right"
                    activeKey={activePanelKeys}
                    onChange={(keys) => {
                        const active = typeof keys === "string" ? [keys] : keys;
                        const filtered = active.filter((k) =>
                            Array.from(watchlists.keys()).includes(k)
                        );
                        setActivePanelKeys(filtered);
                        ls.set(LOCAL_STORAGE_ACTIVE_WATCHLIST_KEY, filtered);
                    }}
                >
                    {Array.from(watchlists.entries()).map(([key, value]) => {
                        return (
                            <Collapse.Panel
                                key={key}
                                header={generatePanelHeader(value)}
                                extra={settingsControl()}
                            >
                                <Watchlist
                                    auctions={data?.auctions}
                                    revalidate={revalidate}
                                    id={key}
                                    alertIfAbovePrice={value.alertIfAbovePrice}
                                    deleteWatchlist={() => {
                                        deleteWatchlist(key);
                                    }}
                                    openSettingsModal={() => {
                                        setModalData(key);
                                    }}
                                    getMatchingRecords={() =>
                                        getMatchingRecords(value) || []
                                    }
                                    setDataAfterFilter={(data) =>
                                        setDataAfterFilter(data, key)
                                    }
                                />
                            </Collapse.Panel>
                        );
                    })}
                </Collapse>
            )}

            <WatchlistSettingsModal
                modalData={modalData}
                closeModal={() => setModalData(undefined)}
                watchlists={watchlists}
                setWatchlists={setWatchlists}
            />
        </>
    );
};
