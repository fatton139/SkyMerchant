import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
    light: "lightmode.css",
    dark: "darkmode.css",
};

type Props = {};

export const ThemeProvider: React.FunctionComponent<
    React.PropsWithChildren<Props>
> = (props: React.PropsWithChildren<Props>) => {
    return (
        <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
            {props.children}
        </ThemeSwitcherProvider>
    );
};
