import React from "react";
import { AuctionDataProvider, PageLayout } from "../components/layout";
import { MainView } from "../components/views";

const App = () => {
    return (
        <PageLayout title="Sky Merchant">
            <AuctionDataProvider>
                {(data, revalidate, isValidating) => {
                    return (
                        <MainView
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

export default App;
