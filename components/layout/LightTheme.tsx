import React from "react";
import "antd/dist/antd.css";

const LightTheme: React.FunctionComponent<React.PropsWithChildren<{}>> = (
    props: React.PropsWithChildren<{}>
) => {
    return <>{props.children}</>;
};

export default LightTheme;
