import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, Suspense } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Link, createRootRoute, Outlet, createFileRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { extendTheme, ChakraProvider, Flex, Input, Button, Spinner, Text, Badge, Box, Stack, useColorMode, Container, useColorModeValue } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import axios$1 from "axios";
import { useQueryClient, useMutation, useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IoMdAdd } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
function DevButton({ onToggle, Class }) {
  const [showDevTools, setShowDevTools] = useState(false);
  const handleClick = () => {
    setShowDevTools((prev) => !prev);
    onToggle();
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleClick,
      className: `fixed bottom-20 right-4 p-2 ${showDevTools ? "bg-[#cfe2a2]" : "bg-blue-500"} rounded-lg ${Class}`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { src: "/tanstack.webp", className: "w-6 rounded-full", alt: "" }),
        showDevTools ? "Hide DevTools" : /* @__PURE__ */ jsx("p", { className: "text-white", children: "Show DevTools" })
      ] })
    }
  );
}
function DevToolsControls({
  onToggleReactQuery,
  onToggleRouterDevtools
}) {
  const [enableReactQueryDevtools, setEnableReactQueryDevtools] = useState(true);
  const [enableRouterDevtools, setEnableRouterDevtools] = useState(true);
  const handleReactQueryChange = () => {
    const newValue = !enableReactQueryDevtools;
    setEnableReactQueryDevtools(newValue);
    onToggleReactQuery(newValue);
  };
  const handleRouterDevtoolsChange = () => {
    const newValue = !enableRouterDevtools;
    setEnableRouterDevtools(newValue);
    onToggleRouterDevtools(newValue);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 fixed bottom-36 right-4 bg-green-100 rounded-lg border-2 border-green-300 shadow-md", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold mb-4 text-green-800", children: "TanStack DevTools" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-gray-700", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: enableReactQueryDevtools,
            onChange: handleReactQueryChange,
            className: "h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer checked:bg-green-500 checked:border-transparent"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-orange-600 font-medium", children: "Enable React Query Devtools" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-gray-700", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: enableRouterDevtools,
            onChange: handleRouterDevtoolsChange,
            className: "h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer checked:bg-green-500 checked:border-transparent"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 font-medium", children: "Enable TanStack Router Devtools" })
      ] })
    ] })
  ] });
}
function DevTools({ children, enable = true }) {
  const [showDevTools, setShowDevTools] = useState(false);
  const [enableReactQueryDevtools, setEnableReactQueryDevtools] = useState(true);
  const [enableRouterDevtools, setEnableRouterDevtools] = useState(true);
  const toggleDevTools = () => {
    setShowDevTools((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    children,
    enable && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(DevButton, { onToggle: toggleDevTools, Class: "border-2" }),
      showDevTools && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          DevToolsControls,
          {
            onToggleReactQuery: setEnableReactQueryDevtools,
            onToggleRouterDevtools: setEnableRouterDevtools
          }
        ),
        enableReactQueryDevtools && /* @__PURE__ */ jsx(ReactQueryDevtools, { initialIsOpen: false }),
        enableRouterDevtools && /* @__PURE__ */ jsx(TanStackRouterDevtools, {})
      ] })
    ] })
  ] });
}
const LinksTags = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/todos",
    name: "Todos"
  }
];
function Navbar$1() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between w-full py-2 px-4 fixed top-0 left-0 right-0 bg-[#cfe2a2cc] shadow-md z-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/tanstack.webp",
          alt: "tanstack",
          className: "w-12 h-12 rounded-full"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "leading-tight flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold", children: "TanStack Router" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "with Vite + React + TypeScript" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "md:hidden text-2xl",
        onClick: toggleMenu,
        "aria-label": "Toggle Menu",
        children: "☰"
      }
    ),
    /* @__PURE__ */ jsx("nav", { className: "hidden md:flex", children: /* @__PURE__ */ jsx("ul", { className: "flex items-center gap-5", children: LinksTags.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: link.path, className: "text-lg hover:text-gray-700", children: link.name }) }, link.path)) }) }),
    /* @__PURE__ */ jsxs(
      "nav",
      {
        className: `md:hidden fixed top-0 left-0 h-full w-64 z-[999] bg-[#cfe2a2] p-6 transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} z-40`,
        children: [
          /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-4", children: LinksTags.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: link.path,
              className: "text-lg hover:text-gray-700",
              onClick: closeMenu,
              children: link.name
            }
          ) }, link.path)) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "mt-8 text-lg text-red-500",
              onClick: toggleMenu,
              "aria-label": "Close Menu",
              children: "Close"
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-50 z-30",
        onClick: toggleMenu
      }
    )
  ] });
}
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true
};
const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.500", "gray.900")(props)
      }
    })
  }
});
const Route$1 = createRootRoute({
  component: Root
});
function Root() {
  return /* @__PURE__ */ jsx(DevTools, { enable: true, children: /* @__PURE__ */ jsxs(ChakraProvider, { theme, children: [
    /* @__PURE__ */ jsx(Navbar$1, {}),
    /* @__PURE__ */ jsx("main", { className: "p-2  text-white w-full h-screen mt-16", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] }) });
}
const baseURL = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080";
const axios = axios$1.create({
  baseURL
});
const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();
  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          "/api/todos",
          {
            body: newTodo
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (!res.data) {
          throw new Error("No data found in response");
        }
        const data = res.data;
        setNewTodo("");
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: createTodo, children: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "text",
        value: newTodo,
        onChange: (e) => setNewTodo(e.target.value),
        ref: (input) => input && input.focus()
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        mx: 2,
        type: "submit",
        _active: {
          transform: "scale(.97)"
        },
        children: isCreating ? /* @__PURE__ */ jsx(Spinner, { size: "xs" }) : /* @__PURE__ */ jsx(IoMdAdd, { size: 30 })
      }
    )
  ] }) });
};
function useTodoMutation(mutationKey, mutationFn, options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    ...options
  });
}
const TodoItem = ({ todo }) => {
  const { mutate: updateTodo, isPending: isUpdating } = useTodoMutation(
    ["updateTodo"],
    async () => {
      if (todo.completed) {
        alert("Todo already completed!");
        return;
      }
      const res = await axios.patch(`/api/todos/${todo._id}`, {
        completed: true
      });
      if (!res.data) throw new Error("No data found in response");
      return res.data;
    }
  );
  const { mutate: deleteTodo, isPending: isDeleting } = useTodoMutation(
    ["deleteTodo"],
    async () => {
      const res = await axios.delete(`/api/todos/${todo._id}`);
      if (!res.data) throw new Error("No data found in response");
      return res.data;
    }
  );
  return /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
    /* @__PURE__ */ jsxs(
      Flex,
      {
        flex: 1,
        alignItems: "center",
        border: "1px",
        borderColor: "gray.600",
        p: 2,
        borderRadius: "lg",
        justifyContent: "space-between",
        children: [
          /* @__PURE__ */ jsx(
            Text,
            {
              color: todo.completed ? "green.200" : "yellow.100",
              textDecoration: todo.completed ? "line-through" : "none",
              children: todo.body
            }
          ),
          todo.completed ? /* @__PURE__ */ jsx(Badge, { ml: "1", colorScheme: "green", children: "Done" }) : /* @__PURE__ */ jsx(Badge, { ml: "1", colorScheme: "yellow", children: "In Progress" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(
        Box,
        {
          color: "green.500",
          cursor: "pointer",
          onClick: () => updateTodo(todo),
          opacity: isUpdating ? 0.5 : 1,
          children: /* @__PURE__ */ jsx(FaCheckCircle, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsx(
        Box,
        {
          color: "red.500",
          cursor: "pointer",
          onClick: () => deleteTodo(todo),
          opacity: isDeleting ? 0.5 : 1,
          children: /* @__PURE__ */ jsx(MdDelete, { size: 25 })
        }
      )
    ] })
  ] });
};
const TodoList = () => {
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/todos", {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = res.data;
        if (!data) {
          throw new Error("No data found");
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    refetchOnWindowFocus: false
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Text,
      {
        fontSize: "4xl",
        bgGradient: "linear(to-l, teal.900, teal.100)",
        bgClip: "text",
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center",
        my: 2,
        children: "Today's Tasks"
      }
    ),
    isLoading && /* @__PURE__ */ jsx(Flex, { justifyContent: "center", my: 4, children: /* @__PURE__ */ jsx(Spinner, { size: "xl" }) }),
    !isLoading && (todos == null ? void 0 : todos.length) === 0 && /* @__PURE__ */ jsxs(Stack, { alignItems: "center", gap: "3", children: [
      /* @__PURE__ */ jsx(Text, { fontSize: "xl", textAlign: "center", color: "gray.500", children: "All tasks completed! 🤞" }),
      /* @__PURE__ */ jsx("img", { src: "/go.png", alt: "Go logo", width: 70, height: 70 })
    ] }),
    /* @__PURE__ */ jsx(Stack, { gap: 3, children: todos == null ? void 0 : todos.map((todo) => /* @__PURE__ */ jsx(TodoItem, { todo }, todo._id)) })
  ] });
};
function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return /* @__PURE__ */ jsx(Container, { maxW: "900px", children: /* @__PURE__ */ jsx(
    Box,
    {
      bg: useColorModeValue("gray.400", "gray.700"),
      px: 4,
      my: 4,
      borderRadius: "5",
      children: /* @__PURE__ */ jsxs(Flex, { h: 16, alignItems: "center", justifyContent: "space-between", children: [
        /* @__PURE__ */ jsxs(
          Flex,
          {
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            display: { base: "none", sm: "flex" },
            children: [
              /* @__PURE__ */ jsx("img", { src: "/react.png", alt: "logo", width: 50, height: 50 }),
              /* @__PURE__ */ jsx(Text, { fontSize: "40", children: "+" }),
              /* @__PURE__ */ jsx("img", { src: "/go.png", alt: "logo", width: 40, height: 40 }),
              /* @__PURE__ */ jsx(Text, { fontSize: "40", children: "=" }),
              /* @__PURE__ */ jsx("img", { src: "/explode.png", alt: "logo", width: 50, height: 50 })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Flex, { alignItems: "center", gap: 3, children: [
          /* @__PURE__ */ jsx(Text, { fontSize: "lg", fontWeight: 500, children: "Daily Tasks" }),
          /* @__PURE__ */ jsx(Button, { onClick: toggleColorMode, children: colorMode === "light" ? /* @__PURE__ */ jsx(IoMoon, {}) : /* @__PURE__ */ jsx(LuSun, { size: 20 }) })
        ] })
      ] })
    }
  ) });
}
function Todos({}) {
  return /* @__PURE__ */ jsxs(Stack, { h: "100vh", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(TodoForm, {}),
      /* @__PURE__ */ jsx(TodoList, {})
    ] })
  ] });
}
const Route = createFileRoute("/todos")({
  component: Todos
});
const IndexLazyImport = createFileRoute("/")();
const TodosRoute = Route.update({
  id: "/todos",
  path: "/todos",
  getParentRoute: () => Route$1
});
const IndexLazyRoute = IndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
}).lazy(() => import("./assets/index.lazy-Caz0m0Yk.js").then((d) => d.Route));
const rootRouteChildren = {
  IndexLazyRoute,
  TodosRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
function Hydrate({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const queryClient = new QueryClient();
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (!isHydrated) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children }) });
}
function NotFound404() {
  return /* @__PURE__ */ jsx("section", { className: "w-full h-screen flex items-center justify-center  text-white", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[1.6em] font-semibold", children: [
      /* @__PURE__ */ jsx("h1", { children: "404" }),
      /* @__PURE__ */ jsx("p", { children: "|" }),
      /* @__PURE__ */ jsx("p", { children: "Page Not Found" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-[1.2em] font-thin text-gray-300", children: "The page you are looking for does not exist." })
  ] }) });
}
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound404
});
function App({}) {
  return /* @__PURE__ */ jsx(Hydrate, { children: /* @__PURE__ */ jsx(RouterProvider, { router }) });
}
function render(_url, _ssrManifest, options) {
  return renderToPipeableStream(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(App, {}) }) }),
    options
  );
}
export {
  render
};
