import { SyncOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";
import { getFetcher } from "../utils/fetcher";

type Props = {
    endpoint: string;
};

export const TagStatus: React.FunctionComponent<Props> = (props: Props) => {
    const [isOperational, setIsOperational] = React.useState<
        boolean | undefined
    >();

    const checkStatus = async () => {
        try {
            await getFetcher(props.endpoint);
            setIsOperational(true);
        } catch {
            setIsOperational(false);
        }
    };

    React.useEffect(() => {
        checkStatus();
    }, []);

    if (isOperational === undefined) {
        return <Tag icon={<SyncOutlined spin />}>Checking API status</Tag>;
    } else if (!isOperational) {
        return <Tag color="red">API Status - Inactive</Tag>;
    } else {
        return <Tag color="green">API Status - Operational</Tag>;
    }
};
