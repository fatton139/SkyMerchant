import React from "react";
import { PageLayout } from "../../components/layout";
import { SupportView } from "../../components/views";

const App = () => {
    return (
        <PageLayout title="Sky Merchant | Support">
            {() => {
                return <SupportView />;
            }}
        </PageLayout>
    );
};

export default App;
