import { useTodoMutation } from "@/hooks/useTodoMutation";
import axios from "@/server/api/axios";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoItem = ({ todo }: { todo: Todo }) => {
  // Reusable update mutation
  const { mutate: updateTodo, isPending: isUpdating } = useTodoMutation(
    ["updateTodo"],
    async () => {
      if (todo.completed) {
        alert("Todo already completed!");
        return;
      }
      const res = await axios.patch(`/api/todos/${todo._id}`, {
        completed: true,
      });
      if (!res.data) throw new Error("No data found in response");
      return res.data;
    }
  );

  // Reusable delete mutation
  const { mutate: deleteTodo, isPending: isDeleting } = useTodoMutation(
    ["deleteTodo"],
    async () => {
      const res = await axios.delete(`/api/todos/${todo._id}`);
      if (!res.data) throw new Error("No data found in response");
      return res.data;
    }
  );

  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex
        flex={1}
        alignItems={"center"}
        border={"1px"}
        borderColor={"gray.600"}
        p={2}
        borderRadius={"lg"}
        justifyContent={"space-between"}>
        <Text
          color={todo.completed ? "green.200" : "yellow.100"}
          textDecoration={todo.completed ? "line-through" : "none"}>
          {todo.body}
        </Text>
        {todo.completed ? (
          <Badge ml="1" colorScheme="green">
            Done
          </Badge>
        ) : (
          <Badge ml="1" colorScheme="yellow">
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Box
          color={"green.500"}
          cursor={"pointer"}
          onClick={() => updateTodo(todo)}
          opacity={isUpdating ? 0.5 : 1}>
          <FaCheckCircle size={20} />
        </Box>
        <Box
          color={"red.500"}
          cursor={"pointer"}
          onClick={() => deleteTodo(todo)}
          opacity={isDeleting ? 0.5 : 1}>
          <MdDelete size={25} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
