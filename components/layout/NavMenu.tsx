import {
    BulbFilled,
    BulbOutlined,
    DatabaseOutlined,
    HomeOutlined,
    ProfileOutlined,
    SettingOutlined,
    VerifiedOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import * as ls from "local-storage";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { LOCAL_STORAGE_THEME } from "../consts";

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
    {
        name: "Support",
        path: "/support",
        icon: <VerifiedOutlined />,
    },
];

type Props = {
    currentPath: string;
    darkmode: boolean;
};

export const NavMenu: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Menu
            mode="vertical"
            theme={props.darkmode ? "dark" : "light"}
            defaultSelectedKeys={[props.currentPath]}
        >
            {links.map((link) => {
                return (
                    <Menu.Item key={link.path} icon={link.icon}>
                        <Link href={link.path}>{link.name}</Link>
                    </Menu.Item>
                );
            })}
            <SubMenu icon={<SettingOutlined />} title="Settings">
                <Menu.Item
                    icon={props.darkmode ? <BulbOutlined /> : <BulbFilled />}
                    onClick={() => {
                        ls.set(
                            LOCAL_STORAGE_THEME,
                            props.darkmode ? "light" : "dark"
                        );
                        Router.reload();
                    }}
                >
                    {`Use ${props.darkmode ? "Lightmode" : "Darkmode"}`}
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};
