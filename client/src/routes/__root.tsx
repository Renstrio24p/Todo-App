import { createRootRoute, Outlet } from "@tanstack/react-router";
import { DevTools } from "@/server/DevTools.tsx";
import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme/theme";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <DevTools enable={true}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <main className="p-2  text-white w-full h-screen mt-16">
          <Outlet />
        </main>
      </ChakraProvider>
    </DevTools>
  );
}
