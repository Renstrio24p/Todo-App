import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: true,
};

const theme = extendTheme({
    config,
    styles: {
        global: (props: Record<string, any>) => ({
            body: {
                bg: mode("gray.500", "gray.900")(props),
            },
        }),
    },
});

export default theme;
