import { Breadcrumb } from "antd";
import React from "react";

type Props = {
    currentPath: string;
};

export const NavBreadcrumb: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>Fishing Simulator</Breadcrumb.Item>
            {props.currentPath.split("/").map((crumb) => {
                return <Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>;
            })}
        </Breadcrumb>
    );
};
