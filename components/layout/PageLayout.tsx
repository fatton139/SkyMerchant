import React, { ReactNode } from "react";
import Head from "next/head";
import { BodyLayoutProvider } from "./BodyLayoutProvider";

type Props = {
    children?: ReactNode;
    title?: string;
};

export const PageLayout = ({
    children,
    title = "This is the default title",
}: Props) => (
    <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <main>
            <BodyLayoutProvider>{children}</BodyLayoutProvider>
        </main>
    </>
);
