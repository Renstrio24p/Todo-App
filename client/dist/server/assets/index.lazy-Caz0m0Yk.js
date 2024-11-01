import { jsxs, jsx } from "react/jsx-runtime";
import { createLazyFileRoute } from "@tanstack/react-router";
function Home({}) {
  return /* @__PURE__ */ jsxs("section", { className: "w-full h-screen flex items-center justify-center flex-col px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/tanstack.webp",
          alt: "tanstack",
          className: "w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 hover:drop-shadow-lg hover:scale-110"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-4xl font-bold", children: "+" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/vite.svg",
          alt: "vite",
          className: "w-16 h-16 md:w-20 md:h-20 transition-all duration-300 hover:drop-shadow-lg hover:scale-110"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-4xl font-bold", children: "+" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/react.svg",
          alt: "react",
          className: "w-24 h-24 md:w-36 md:h-36 transition-all duration-300 hover:drop-shadow-lg hover:scale-110"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-4xl font-bold", children: "+" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/Typescript.png",
          alt: "typescript",
          className: "w-16 h-16 md:w-20 md:h-20 transition-all duration-300 hover:drop-shadow-lg hover:scale-110"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-semibold text-gray-200", children: "TanStack Router with Vite" }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-gray-300", children: "Modern and scalable routing for React applications" }),
      /* @__PURE__ */ jsx("p", { children: "File based Routing SSR with DevTools" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6", children: "Start by creating your first route at" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 p-3 bg-gray-800 rounded-md", children: "./src/routes/index.lazy.tsx" })
    ] })
  ] });
}
const Route = createLazyFileRoute("/")({
  component: () => /* @__PURE__ */ jsx(Home, {})
});
export {
  Route
};
