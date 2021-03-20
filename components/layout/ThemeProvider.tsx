import dynamic from "next/dynamic";
import React from "react";

type Props = {
    darkMode: boolean;
};

const Component = {
    a: dynamic(import("./DarkTheme")),
    b: dynamic(import("./LightTheme")),
};

export const ThemeProvider: React.FunctionComponent<
    React.PropsWithChildren<Props>
> = (props: React.PropsWithChildren<Props>) => {
    return props.darkMode ? (
        <Component.a>{props.children}</Component.a>
    ) : (
        <Component.b>{props.children}</Component.b>
    );
};
