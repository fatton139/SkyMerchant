import { Breadcrumb, Layout } from "antd";
import React, { PropsWithChildren } from "react";
import styles from "../../styles/Layout.module.scss";
import { NavMenu } from "./NavMenu";

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
                <div className={styles["logo-container"]}>
                    <div className={styles.logo} />
                </div>
                <NavMenu />
            </Layout.Sider>
            <Layout>
                <Layout.Header className={styles.header}>Header</Layout.Header>
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
