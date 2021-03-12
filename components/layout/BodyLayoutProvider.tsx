import { Layout } from "antd";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import styles from "../../styles/Layout.module.scss";
import { NavBreadcrumb } from "./NavBreadcrumb";
import { NavMenu } from "./NavMenu";

type Props = {};

export const BodyLayoutProvider: React.FunctionComponent<
    PropsWithChildren<Props>
> = (props: PropsWithChildren<Props>) => {
    const router = useRouter();

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
                <NavMenu currentPath={router.pathname} />
            </Layout.Sider>
            <Layout>
                <Layout.Header className={styles.header}>Header</Layout.Header>
                <Layout.Content
                    style={{
                        padding: 24,
                    }}
                >
                    {props.children}
                </Layout.Content>
                <Layout.Footer>
                    <NavBreadcrumb currentPath={router.pathname} />
                </Layout.Footer>
            </Layout>
        </Layout>
    );
};
