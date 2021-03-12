import "antd/dist/antd.css";
import React from "react";
import { PageLayout } from "../components/layout";
import { BasicTable } from "../components/Table";

export const App = () => {
    return (
        <PageLayout title="Fishing Simulator">
            <BasicTable />
        </PageLayout>
    );
};

export default App;
