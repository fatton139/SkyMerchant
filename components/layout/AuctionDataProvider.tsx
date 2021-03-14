import React from "react";
import { AuctionResponse } from "../../interfaces";
import { useRepeatingSWR } from "../hooks";

type Props = {
    children: (
        data: AuctionResponse | undefined,
        revlidate: () => Promise<boolean>,
        isValidating: boolean,
    ) => React.ReactNode;
};

export const AuctionDataProvider: React.FunctionComponent<Props> = (
    props: Props
) => {
    const { data, revalidate, isValidating } = useRepeatingSWR();

    return <>{props.children(data, revalidate, isValidating)}</>;
};
