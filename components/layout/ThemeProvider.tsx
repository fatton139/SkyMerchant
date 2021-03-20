import * as ls from "local-storage";
import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { LOCAL_STORAGE_THEME } from "../consts";
const themes = {
    light: "lightmode.css",
    dark: "darkmode.css",
};

type Props = {};

export const ThemeProvider: React.FunctionComponent<
    React.PropsWithChildren<Props>
> = (props: React.PropsWithChildren<Props>) => {
    const [defaultTheme, setDefaultTheme] = React.useState<"light" | "dark">(
        "dark"
    );

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         const lsTheme: "light" | "dark" | undefined = ls.get(
    //             LOCAL_STORAGE_THEME
    //         );
    //         if (lsTheme) {
    //             // setDefaultTheme(lsTheme);
    //         } else {
    //             setDefaultTheme(
    //                 window.matchMedia("(prefers-color-scheme: dark)").matches
    //                     ? "dark"
    //                     : "light"
    //             );
    //         }
    //     }, 0);
    // }, []);

    return (
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={defaultTheme}>
            {props.children}
        </ThemeSwitcherProvider>
    );
};
