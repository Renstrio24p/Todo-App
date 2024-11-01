import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import TodoNav from "@/components/TodoNav";
import { Container, Stack } from "@chakra-ui/react";

type Props = {};

export default function Todos({}: Props) {
  return (
    <Stack h="100vh">
      <TodoNav />
      <Container>
         <TodoForm />
         <TodoList />
      </Container>
    </Stack>
  );
}
