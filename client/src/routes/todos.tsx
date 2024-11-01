import Todos from "@/pages/Todos/Todos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todos")({
  component: Todos,
});


