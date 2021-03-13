import {
    ReloadOutlined,
    SearchOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import {
    Button,
    Input,
    Skeleton,
    Space,
    Table,
    Tag,
    Tooltip,
    Statistic,
    Row,
} from "antd";
import React from "react";
import Highlighter from "react-highlight-words";
import useSWR from "swr";
import { AuctionRecord, AuctionResponse } from "../../interfaces";
import { postFetcher } from "../../utils/fetcher";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addLocale(en);

const getTagColourFromTier = (
    tier: AuctionRecord["tier"]
): string | undefined => {
    switch (tier) {
        case "COMMON":
            return undefined;
        case "UNCOMMON":
            return "blue";
        case "RARE":
            return "geekblue";
        case "EPIC":
            return "purple";
        case "LEGENDARY":
            return "orange";
        case "MYTHIC":
            return "magenta";
        case "SPECIAL":
            return "lime";
        case "VERY SPECIAL":
            return "cyan";
        default:
            return undefined;
    }
};

const getTagColourFromCategory = (
    category: AuctionRecord["category"]
): string | undefined => {
    switch (category) {
        case "accessories":
            return "magenta";
        case "armor":
            return "cyan";
        case "blocks":
            return undefined;
        case "consumables":
            return "blue";
        case "misc":
            return "lime";
        case "weapon":
            return "volcano";
        default:
            return undefined;
    }
};

export const WatchTable: React.FunctionComponent = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        []
    );
    const [searchText, setSearchText] = React.useState<string>("");
    const [showCountdown, setShowCountdown] = React.useState<boolean>(false);

    const { data, error, revalidate, isValidating } = useSWR<AuctionResponse>(
        "https://run.mocky.io/v3/9fc59513-2562-4a57-b135-73c5d4d086ed",
        postFetcher
    );

    const columns = React.useMemo(() => {
        return [
            {
                title: "Type",
                dataIndex: "bin",
                render: (value: boolean) => (
                    <div>{value ? "Buy Instantly" : "Auction"}</div>
                ),
                filters: [
                    {
                        text: "Buy Instantly",
                        value: true,
                    },
                    {
                        text: "Auction",
                        value: false,
                    },
                ],
                onFilter: (
                    value: string | number | boolean,
                    record: AuctionRecord
                ) => record.bin === value,
            },
            {
                title: "Name",
                dataIndex: "item_name",
                key: "name",
                render: (text: string) => (
                    <a>
                        <Highlighter
                            autoEscape
                            highlightStyle={{
                                backgroundColor: "#ffc069",
                                padding: 0,
                            }}
                            searchWords={[searchText]}
                            textToHighlight={text}
                        />
                    </a>
                ),
                sorter: (a: AuctionRecord, b: AuctionRecord) =>
                    a["item_name"].localeCompare(b["item_name"]),
                filterIcon: (filtered: boolean) => (
                    <SearchOutlined
                        style={{ color: filtered ? "#1890ff" : undefined }}
                    />
                ),
                onFilter: (
                    value: string | number | boolean,
                    record: AuctionRecord
                ) =>
                    record["item_name"]
                        .toString()
                        .toLowerCase()
                        .includes(value.toString().toLowerCase()),
                filterDropdown: ({
                    setSelectedKeys,
                    selectedKeys,
                    confirm,
                    clearFilters,
                }: any) => (
                    <div style={{ padding: 8 }}>
                        <Input
                            ref={(node) => {
                                node?.focus();
                            }}
                            placeholder={"Fishing Rod"}
                            value={selectedKeys[0]}
                            onChange={(e) =>
                                setSelectedKeys(
                                    e.target.value ? [e.target.value] : []
                                )
                            }
                            onPressEnter={() => {
                                confirm();
                                setSearchText(selectedKeys[0]);
                            }}
                            style={{
                                width: 188,
                                marginBottom: 8,
                                display: "block",
                            }}
                        />
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    confirm();
                                    setSearchText(selectedKeys[0]);
                                }}
                                icon={<SearchOutlined />}
                                size="small"
                                style={{ width: 90 }}
                            >
                                Search
                            </Button>
                            <Button
                                onClick={() => {
                                    clearFilters();
                                    setSearchText("");
                                }}
                                size="small"
                                style={{ width: 90 }}
                            >
                                Reset
                            </Button>
                        </Space>
                    </div>
                ),
            },
            {
                title: "Bid",
                dataIndex: "highest_bid_amount",
                key: "bid",
                render: (text: string) => <p style={{ margin: 0 }}>{text}</p>,
                sorter: (a: AuctionRecord, b: AuctionRecord) =>
                    b["highest_bid_amount"] - a["highest_bid_amount"],
            },
            {
                title: "Ending",
                dataIndex: "end",
                render: (value: number) => {
                    const date = new Date(value);
                    return (
                        <Tooltip title={date.toLocaleString()}>
                            <ReactTimeAgo key={Date.now()} date={date} />
                            {showCountdown && (
                                <Statistic.Countdown
                                    value={value}
                                    valueStyle={{
                                        fontSize: 12,
                                    }}
                                    style={{
                                        fontSize: 12,
                                    }}
                                />
                            )}
                        </Tooltip>
                    );
                },
                sorter: (a: AuctionRecord, b: AuctionRecord) =>
                    b["end"] - a["end"],
                filters: [
                    { text: "Ended", value: true },
                    { text: "Active", value: false },
                ],
                onFilter: (
                    value: string | number | boolean,
                    record: AuctionRecord
                ) =>
                    value ? record.end <= Date.now() : record.end > Date.now(),
            },
            {
                title: "Tier",
                dataIndex: "tier",
                key: "tier",
                render: (text: AuctionRecord["tier"]) => (
                    <Tag color={getTagColourFromTier(text)}>
                        {text.toUpperCase()}
                    </Tag>
                ),
                filters: [
                    {
                        text: "COMMON",
                        value: "COMMON",
                    },
                    {
                        text: "UNCOMMON",
                        value: "UNCOMMON",
                    },
                    {
                        text: "RARE",
                        value: "RARE",
                    },
                    {
                        text: "EPIC",
                        value: "EPIC",
                    },
                    {
                        text: "LEGENDARY",
                        value: "LEGENDARY",
                    },
                    {
                        text: "MYTHIC",
                        value: "MYTHIC",
                    },
                    {
                        text: "SPECIAL",
                        value: "SPECIAL",
                    },
                    {
                        text: "VERY SPECIAL",
                        value: "VERY SPECIAL",
                    },
                ],
                onFilter: (
                    value: string | number | boolean,
                    record: AuctionRecord
                ) => record.tier === value,
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category",
                render: (text: AuctionRecord["category"]) => (
                    <Tag color={getTagColourFromCategory(text)}>
                        {text.toUpperCase()}
                    </Tag>
                ),
                filters: [
                    {
                        text: "WEAPON",
                        value: "weapon",
                    },
                    {
                        text: "ARMOR",
                        value: "armor",
                    },
                    {
                        text: "ACCESSORIES",
                        value: "accessories",
                    },
                    {
                        text: "CONSUMABLES",
                        value: "consumables",
                    },
                    {
                        text: "BLOCKS",
                        value: "blocks",
                    },

                    {
                        text: "MISC",
                        value: "misc",
                    },
                ],
                onFilter: (
                    value: string | number | boolean,
                    record: AuctionRecord
                ) => record.category === value,
            },
        ];
    }, [searchText, showCountdown]);

    if (!data) {
        return <Skeleton active />;
    }

    return (
        <>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Row justify={"space-between"}>
                    <Space>
                        <Button
                            type="primary"
                            disabled={selectedRowKeys.length === 0}
                        >
                            Watch
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={revalidate}
                            loading={isValidating}
                        />
                    </Space>
                    <Space>
                        <Button
                            icon={<ClockCircleOutlined />}
                            onClick={() => {
                                setShowCountdown((prev: boolean) => {
                                    return !prev;
                                });
                            }}
                        >{`${
                            showCountdown ? "Hide" : "Show"
                        } countdown`}</Button>
                    </Space>
                </Row>
                <Table
                    loading={isValidating}
                    expandable={{
                        rowExpandable: () => true,
                        expandedRowRender: (record: AuctionRecord) => (
                            <div>{record["item_lore"]}</div>
                        ),
                    }}
                    columns={columns}
                    dataSource={data.auctions}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
                />
            </Space>
        </>
    );
};
