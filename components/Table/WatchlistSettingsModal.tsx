import { Form, Input, Modal } from "antd";
import produce from "immer";
import React from "react";
import { WatchList } from "../../interfaces";
import { updateWatchlistLocalstorage } from "../utils";

type Props = {
    modalData?: string;
    watchlists: Map<string, WatchList>;
    setWatchlists: (watchlists: Map<string, WatchList>) => void;
    closeModal: () => void;
};

const updateWatchlistProp = <T extends WatchList, K extends keyof WatchList>(
    watchlists: Map<string, WatchList>,
    key: string,
    objectKey: K,
    value: T[K]
) => {
    return produce(watchlists, (draft) => {
        const prev = draft.get(key);
        if (prev) {
            draft.set(key, {
                ...prev,
                [objectKey]: value,
            });
            updateWatchlistLocalstorage(key, objectKey, value);
        }
    });
};

export const WatchlistSettingsModal: React.FunctionComponent<Props> = (
    props: Props
) => {
    const currentData = React.useMemo(() => {
        return props.watchlists.get(props.modalData!);
    }, [props.modalData, props.watchlists]);

    return (
        <Modal
            title="Watchlist Settings"
            visible={props.modalData !== undefined}
            onCancel={props.closeModal}
            onOk={props.closeModal}
        >
            <Form layout="vertical">
                <Form.Item
                    label="Watchlist Name"
                    tooltip="The name of your watchlist"
                >
                    <Input
                        type="text"
                        value={currentData?.name || ""}
                        onChange={(e) => {
                            props.setWatchlists(
                                updateWatchlistProp(
                                    props.watchlists,
                                    props.modalData!,
                                    "name",
                                    e.target.value
                                )
                            );
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Alert If Above Price"
                    tooltip="Alert if items go above this price"
                >
                    <Input
                        type="number"
                        value={currentData?.alertIfAbovePrice || ""}
                        onChange={(e) => {
                            props.setWatchlists(
                                updateWatchlistProp(
                                    props.watchlists,
                                    props.modalData!,
                                    "alertIfAbovePrice",
                                    Number(e.target.value)
                                )
                            );
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
