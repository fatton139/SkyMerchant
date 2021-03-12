import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import { PageLayout } from "../components/layout";
import "../styles/app.scss";

export const App = ({ Component }: AppProps) => {
    return (
        <PageLayout title="Fishing Simulator">
            <Component />
        </PageLayout>
    );
};

export default App;
