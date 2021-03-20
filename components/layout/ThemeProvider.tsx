import dynamic from "next/dynamic";
import React from "react";

type Props = {
    darkMode: boolean;
};

const Component = {
    Dark: dynamic(import("./DarkTheme")),
    Light: dynamic(import("./LightTheme")),
};

export const ThemeProvider: React.FunctionComponent<
    React.PropsWithChildren<Props>
> = (props: React.PropsWithChildren<Props>) => {
    return props.darkMode ? (
        <Component.Dark>{props.children}</Component.Dark>
    ) : (
        <Component.Light>{props.children}</Component.Light>
    );
};
