import React, { PropsWithChildren } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

type Props = {};

export const BodyLayoutProvider: React.FunctionComponent<
    PropsWithChildren<Props>
> = (props: PropsWithChildren<Props>) => {
    const [menuCollapsed, setMenuCollapsed] = React.useState<boolean>(false);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout.Sider
                collapsible
                collapsed={menuCollapsed}
                onCollapse={setMenuCollapsed}
            >
                <div className="logo-container">
                    <div className="logo"/>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1">Home</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout>
                <Layout.Header className="main-header">Header</Layout.Header>
                <Layout.Content>{props.children}</Layout.Content>
                <Layout.Footer>
                    <Breadcrumb>
                        <Breadcrumb.Item>Fishing Simulator</Breadcrumb.Item>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                </Layout.Footer>
            </Layout>
        </Layout>
    );
};
