import Head from "next/head";
import React, { ReactNode } from "react";
import { BodyLayoutProvider } from "./BodyLayoutProvider";
import { ThemeProvider } from "./ThemeProvider";
import * as ls from "local-storage";
import { LOCAL_STORAGE_THEME } from "../consts";

type Props = {
    children?: ReactNode;
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
            </Head>
            <ThemeProvider darkMode={darkMode}>
                <BodyLayoutProvider darkMode={darkMode}>
                    {children}
                </BodyLayoutProvider>
            </ThemeProvider>
        </>
    );
};
