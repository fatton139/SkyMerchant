import { Menu } from "antd";
import Link from "next/link";
import React from "react";
import {
    HomeOutlined,
    DatabaseOutlined,
    ProfileOutlined,
} from "@ant-design/icons";

type Link = {
    name: string;
    path: string;
    icon?: React.ReactNode;
};

const links: Link[] = [
    {
        name: "Home",
        path: "/",
        icon: <HomeOutlined />,
    },
    {
        name: "Watchlist",
        path: "/watchlist",
        icon: <ProfileOutlined />,
    },
    {
        name: "Item Database",
        path: "/item-database",
        icon: <DatabaseOutlined />,
    },
];

type Props = {
    currentPath: string;
};

export const NavMenu: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[props.currentPath]}
        >
            {links.map((link) => {
                return (
                    <Menu.Item key={link.path} icon={link.icon}>
                        <Link href={link.path}>{link.name}</Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};
