package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {
	fmt.Println("Hello, World 2!")

	app := fiber.New()

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	PORT := os.Getenv("PORT")

	todos := []Todo{}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"status": "success"})
	})

	// Create a todo
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Body is required", "data": nil})
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Todo created", "data": todo})
	})

	// Update a todo
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid ID"})
		}

		todoUpdate := new(Todo)
		if err := c.BodyParser(todoUpdate); err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid request"})
		}

		for i, todo := range todos {
			if todo.ID == id {
				if todoUpdate.Body != "" {
					todos[i].Body = todoUpdate.Body
				}
				todos[i].Completed = todoUpdate.Completed

				return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Todo updated", "data": todos[i]})
			}
		}

		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Todo not found"})
	})

	// Delete a todo
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = append(todos[:i], todos[i+1:]...)

				return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Todo deleted"})
			}
		}

		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Todo not found"})
	})

	// Get all todos
	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"status": "success", "data": todos})
	})

	log.Fatal(app.Listen(`localhost:` + PORT))
}
