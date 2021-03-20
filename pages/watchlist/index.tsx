import React from "react";
import { AuctionDataProvider, PageLayout } from "../../components/layout";
import { WatchView } from "../../components/views";

const Page = () => {
    return (
        <PageLayout title="Sky Merchant | Watchlist">
            {(darkMode) => {
                return (
                    <AuctionDataProvider>
                        {(data, revalidate, isValidating) => {
                            return (
                                <WatchView
                                    data={data}
                                    revalidate={revalidate}
                                    isValidating={isValidating}
                                    darkMode={darkMode}
                                />
                            );
                        }}
                    </AuctionDataProvider>
                );
            }}
        </PageLayout>
    );
};

export default Page;
