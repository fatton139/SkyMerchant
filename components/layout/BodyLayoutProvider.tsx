import { Layout, PageHeader, Spin } from "antd";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { HEALTH_CHECK_ENDPOINT } from "../../interfaces";
import styles from "../../styles/Layout.module.scss";
import { useRouterTransition } from "../hooks";
import { TagStatus } from "./ApiStatus";
import { NavBreadcrumb } from "./NavBreadcrumb";
import { NavMenu } from "./NavMenu";

type Props = {
    darkMode: boolean;
    children: (darkMode: boolean) => React.ReactNode;
};

export const BodyLayoutProvider: React.FunctionComponent<
    PropsWithChildren<Props>
> = (props: PropsWithChildren<Props>) => {
    const router = useRouter();

    const [menuCollapsed, setMenuCollapsed] = React.useState<boolean>(false);
    const isTransitioning = useRouterTransition();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout.Sider
                collapsible
                collapsed={menuCollapsed}
                onCollapse={setMenuCollapsed}
                theme={props.darkMode ? "dark" : "light"}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                }}
            >
                <div className={styles["logo-container"]}>
                    <img src="./logo.jpg" className={styles.logo} />
                </div>
                <NavMenu
                    currentPath={router.pathname}
                    darkmode={props.darkMode}
                />
            </Layout.Sider>
            <Layout style={{ marginLeft: 200 }}>
                <PageHeader
                    title="Sky Merchant"
                    subTitle="Powered by DOTMA Sky Merchant API"
                    tags={<TagStatus endpoint={HEALTH_CHECK_ENDPOINT} />}
                />
                <Layout.Content
                    style={{
                        padding: 24,
                    }}
                >
                    {isTransitioning ? (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Spin />
                        </div>
                    ) : (
                        props.children(props.darkMode)
                    )}
                </Layout.Content>
                <Layout.Footer>
                    <NavBreadcrumb currentPath={router.pathname} />
                </Layout.Footer>
            </Layout>
        </Layout>
    );
};
