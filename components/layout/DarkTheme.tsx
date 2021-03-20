import React from "react";
import "antd/dist/antd.dark.css";

const DarkTheme: React.FunctionComponent<React.PropsWithChildren<{}>> = (
    props: React.PropsWithChildren<{}>
) => {
    return <>{props.children}</>;
};

export default DarkTheme;
