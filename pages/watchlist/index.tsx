import "antd/dist/antd.css";
import React from "react";
import { AuctionDataProvider, PageLayout } from "../../components/layout";
import { WatchView } from "../../components/views";

const Page = () => {
    return (
        <PageLayout title="Fishing Simulator">
            <AuctionDataProvider>
                {(data, revalidate) => {
                    return <WatchView data={data} revalidate={revalidate} />;
                }}
            </AuctionDataProvider>
        </PageLayout>
    );
};

export default Page;
