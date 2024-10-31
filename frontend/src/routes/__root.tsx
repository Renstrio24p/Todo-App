import { createRootRoute, Outlet } from "@tanstack/react-router";
import { DevTools } from "@/server/DevTools.tsx";
import Navbar from "@/components/Navbar";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <DevTools enable={true}>
      <Navbar />
      <main className="p-2 bg-cyan-900 text-white w-full h-screen mt-16">
        <Outlet />
      </main>
    </DevTools>
  );
}
