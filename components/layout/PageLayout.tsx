import * as ls from "local-storage";
import Head from "next/head";
import React from "react";
import { LOCAL_STORAGE_THEME } from "../consts";
import { BodyLayoutProvider } from "./BodyLayoutProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
    children: (darkMode: boolean) => React.ReactNode;
    title: string;
};

export const PageLayout = ({ children, title }: Props) => {
    const darkMode = ls.get(LOCAL_STORAGE_THEME) === "dark";

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <ThemeProvider darkMode={darkMode}>
                <BodyLayoutProvider darkMode={darkMode}>
                    {children}
                </BodyLayoutProvider>
            </ThemeProvider>
        </>
    );
};
