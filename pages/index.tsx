import React from "react";
import { AuctionDataProvider, PageLayout } from "../components/layout";
import { MainView } from "../components/views";

const App = () => {
    return (
        <PageLayout title="Sky Merchant">
            {(darkMode) => {
                return () => {
                    <AuctionDataProvider>
                        {(data, revalidate, isValidating) => {
                            return (
                                <MainView
                                    data={data}
                                    revalidate={revalidate}
                                    isValidating={isValidating}
                                    darkMode={darkMode}
                                />
                            );
                        }}
                    </AuctionDataProvider>;
                };
            }}
        </PageLayout>
    );
};

export default App;
