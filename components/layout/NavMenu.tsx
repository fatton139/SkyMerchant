import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
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
        name: "Test",
        path: "/test",
    },
];

type Props = {};

export const NavMenu: React.FunctionComponent<Props> = () => {
    const router = useRouter();

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[router.pathname]}
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
