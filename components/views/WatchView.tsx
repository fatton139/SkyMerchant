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
import { updateWatchlistLocalstorage } from "../utils";

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
    const [activePanelKeys, setActivePanelKeys] = React.useState<string[]>([]);

    React.useEffect(() => {
        const persisted = ls.get("watchlists") as
            | PersistedWatchlists
            | undefined;
        if (persisted) {
            setWatchlists(
                produce(watchlists, (draft) => {
                    Object.keys(persisted).forEach((key) => {
                        draft.set(key, {
                            name: persisted[key].name,
                            alertIfAbovePrice: persisted[key].alertIfAbovePrice,
                        });
                    });
                })
            );
            const persistedActivePanels = ls.get("expandedwatchlists") as
                | string[]
                | undefined;
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
        const existing = ls.get("watchlists") as
            | PersistedWatchlists
            | undefined;
        const name = existing?.[key].name;
        delete existing?.[key];
        ls.set("watchlists", existing);
        const activePanels = (ls.get("expandedwatchlists") as string[]) || [];
        ls.set(
            "expandedwatchlists",
            activePanels.filter((k) => Object.keys(existing || {}).includes(k))
        );
        message.success(`Successfully deleted ${name}`);
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
                activeKey={activePanelKeys}
                onChange={(keys) => {
                    const active = typeof keys === "string" ? [keys] : keys;
                    const filtered = active.filter((k) =>
                        Array.from(watchlists.keys()).includes(k)
                    );
                    setActivePanelKeys(filtered);
                    ls.set("expandedwatchlists", filtered);
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
