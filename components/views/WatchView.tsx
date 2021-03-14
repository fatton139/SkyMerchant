import { AppstoreAddOutlined } from "@ant-design/icons";
import {
    Button,
    Collapse,
    Divider,
    message,
    Row,
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
    AuctionResponse,
    PersistedWatchlists,
    WatchList,
} from "../../interfaces";
import { postFetcher } from "../../utils/fetcher";
import { WatchlistSettingsModal, Watchlist } from "../table";

enableMapSet();

export const WatchView = () => {
    const { data, error, revalidate, isValidating } = useSWR<AuctionResponse>(
        "https://run.mocky.io/v3/cf4e8467-5355-49da-b2a6-69625d0f2883",
        postFetcher
    );

    const [watchlists, setWatchlists] = React.useState<Map<string, WatchList>>(
        new Map()
    );

    const [modalData, setModalData] = React.useState<string | undefined>();

    React.useEffect(() => {
        const persisted = ls.get("watchlists") as
            | PersistedWatchlists
            | undefined;
        if (persisted) {
            setWatchlists(
                new Map(
                    Object.keys(persisted).map((key) => [
                        key,
                        {
                            name: persisted[key].name,
                            alertIfAbovePrice: persisted[key].alertIfAbovePrice,
                        },
                    ])
                )
            );
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
                });
            })
        );
        const existing = ls.get("watchlists") as
            | PersistedWatchlists
            | undefined;
        if (existing) {
            ls.set("watchlists", {
                ...existing,
                [key]: {
                    name: defaultName,
                },
            });
        } else {
            ls.set("watchlists", {
                [key]: {
                    name: defaultName,
                },
            });
        }
        message.success("New watchlist has been added");
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

    const settingsControl = React.useCallback(() => {
        return <AppstoreAddOutlined />;
    }, []);

    const generatePanelHeader = React.useCallback(
        (watchlist: WatchList) => {
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
        [watchlists]
    );

    return (
        <>
            <Button
                type="primary"
                icon={<AppstoreAddOutlined />}
                onClick={insertWatchlist}
            >
                New Watchlist
            </Button>
            <Divider orientation="left">Your Watchlists</Divider>
            <Collapse
                expandIconPosition="right"
                defaultActiveKey={[
                    ...((ls.get("expandedwatchlists") as any) || []),
                ]}
                onChange={(keys) => {
                    ls.set("expandedwatchlists", keys);
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
                                deleteWatchlist={() => {
                                    deleteWatchlist(key);
                                }}
                                openSettingsModal={() => {
                                    setModalData(key);
                                }}
                            />
                        </Collapse.Panel>
                    );
                })}
            </Collapse>
            <WatchlistSettingsModal
                modalData={modalData}
                closeModal={() => setModalData(undefined)}
                watchlists={watchlists}
                setWatchlists={setWatchlists}
            />
        </>
    );
};
