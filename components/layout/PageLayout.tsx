import Head from "next/head";
import React, { ReactNode } from "react";
import { BodyLayoutProvider } from "./BodyLayoutProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
    children?: ReactNode;
    title: string;
};

export const PageLayout = ({ children, title }: Props) => {
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
            <ThemeProvider>
                <main>
                    <BodyLayoutProvider>{children}</BodyLayoutProvider>
                </main>
            </ThemeProvider>
        </>
    );
};
