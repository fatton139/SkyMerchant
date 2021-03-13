import "antd/dist/antd.css";
import React from "react";
import { PageLayout } from "../components/layout";
import { WatchTable } from "../components/Table";

export const App = () => {
    return (
        <PageLayout title="Fishing Simulator">
            <WatchTable />
        </PageLayout>
    );
};

export default App;
