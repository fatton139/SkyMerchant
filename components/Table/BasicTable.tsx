import React from "react";
import { Table, Tag, Space, Button, Row, Col } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
            <Space size="middle">
                <a>Watch</a>
                <a>Xd</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

export const BasicTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<any[]>([]);

    return (
        <>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Space>
                    <Button type="primary">Watch</Button>
                    <Button icon={<ReloadOutlined />} />
                </Space>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
                />
            </Space>
        </>
    );
};
