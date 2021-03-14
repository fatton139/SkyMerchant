import "antd/dist/antd.css";
import React from "react";
import { AuctionDataProvider, PageLayout } from "../components/layout";
import { MainView } from "../components/views";

const App = () => {
    return (
        <PageLayout title="Fishing Simulator">
            <AuctionDataProvider>
                {(data, revalidate) => {
                    return <MainView data={data} revalidate={revalidate} />;
                }}
            </AuctionDataProvider>
        </PageLayout>
    );
};

export default App;
