import {
    BulbFilled,
    BulbOutlined,
    DatabaseOutlined,
    HomeOutlined,
    ProfileOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import Link from "next/link";
import React from "react";

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
    darkmode: boolean;
    toggleDarkmode: () => void;
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
                    onClick={props.toggleDarkmode}
                >
                    {`Use ${props.darkmode ? "Lightmode" : "Darkmode"}`}
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};
