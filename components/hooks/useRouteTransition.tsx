import { useRouter } from "next/router";
import React from "react";

export const useRouterTransition = () => {
    const router = useRouter();

    const [isTransitioning, setIsTransitioning] = React.useState(false);

    React.useEffect(() => {
        const handleStart = (url: string) =>
            url !== router.asPath && setIsTransitioning(true);
        const handleComplete = (url: string) =>
            url === router.asPath && setIsTransitioning(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    });

    return isTransitioning;
};
