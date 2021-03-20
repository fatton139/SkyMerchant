import { Layout, PageHeader, Spin } from "antd";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { HEALTH_CHECK_ENDPOINT } from "../../interfaces";
import styles from "../../styles/Layout.module.scss";
import { useRouterTransition } from "../hooks";
import { TagStatus } from "./ApiStatus";
import { NavBreadcrumb } from "./NavBreadcrumb";
import { NavMenu } from "./NavMenu";

type Props = {};

export const BodyLayoutProvider: React.FunctionComponent<
    PropsWithChildren<Props>
> = (props: PropsWithChildren<Props>) => {
    const router = useRouter();

    const [menuCollapsed, setMenuCollapsed] = React.useState<boolean>(false);
    const isTransitioning = useRouterTransition();
    const { currentTheme } = useThemeSwitcher();

    const darkMode = currentTheme === "dark";

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout.Sider
                collapsible
                collapsed={menuCollapsed}
                onCollapse={setMenuCollapsed}
                theme={darkMode ? "dark" : "light"}
            >
                <div className={styles["logo-container"]}>
                    <div className={styles.logo} />
                </div>
                <NavMenu currentPath={router.pathname} darkmode={darkMode} />
            </Layout.Sider>
            <Layout>
                <PageHeader
                    title="Sky Merchant"
                    subTitle="Powered by DOTMA Sky Metchant API"
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
                        props.children
                    )}
                </Layout.Content>
                <Layout.Footer>
                    <NavBreadcrumb currentPath={router.pathname} />
                </Layout.Footer>
            </Layout>
        </Layout>
    );
};
