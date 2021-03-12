import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import { PageLayout } from "../../components/layout";
import "antd/dist/antd.css";
// import "../styles/home.module.scss";

export const App = () => {
    return (
        <PageLayout title="Fishing Simulator">
            {/* <Component /> */}
        </PageLayout>
    );
};

export default App;
