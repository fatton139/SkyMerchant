import "antd/dist/antd.css";
import React from "react";
import { AuctionDataProvider, PageLayout } from "../../components/layout";
import { WatchView } from "../../components/views";

const Page = () => {
    return (
        <PageLayout title="Sky Merchant | Watchlist">
            <AuctionDataProvider>
                {(data, revalidate, isValidating) => {
                    return (
                        <WatchView
                            data={data}
                            revalidate={revalidate}
                            isValidating={isValidating}
                        />
                    );
                }}
            </AuctionDataProvider>
        </PageLayout>
    );
};

export default Page;
