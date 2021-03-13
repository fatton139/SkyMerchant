import { Menu } from "antd";
import Link from "next/link";
import React from "react";

type Link = {
    name: string;
    path: string;
};

const links: Link[] = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Watchlist",
        path: "/watchlist",
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
                    <Menu.Item key={link.path}>
                        <Link href={link.path}>{link.name}</Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};
