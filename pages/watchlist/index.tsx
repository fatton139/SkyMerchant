import "antd/dist/antd.css";
import React from "react";
import { PageLayout } from "../../components/layout";
import { WatchView } from "../../components/views";

export const Page = () => {
    return (
        <PageLayout title="Fishing Simulator">
            <WatchView />
        </PageLayout>
    );
};

export default Page;
