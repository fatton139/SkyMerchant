import "antd/dist/antd.css";
import React from "react";
import { PageLayout } from "../components/layout";
import { MainView } from "../components/views";

export const App = () => {
    return (
        <PageLayout title="Fishing Simulator">
            <MainView />
        </PageLayout>
    );
};

export default App;
