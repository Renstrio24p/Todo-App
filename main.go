package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        string `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool   `json:"completed"`
	Body      string `json:"body" bson:"body"`
}

var collection *mongo.Collection

func main() {
	if os.Getenv("ENV") != "production" {
		if err := godotenv.Load(".env"); err != nil {
			log.Println("Error loading .env file")
		}
	}

	MONGO_URI := os.Getenv("MONGO_URL")
	clientOptions := options.Client().ApplyURI(MONGO_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database("golang_db").Collection("todos")

	app := fiber.New()

	// app.Use((cors.New(cors.Config{
	// 	AllowOrigins: os.Getenv("CLIENT_URL"),
	// 	AllowHeaders: "Origin, Content-Type, Accept",
	// })))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if os.Getenv("ENV") == "production" {
		app.Static("/", "./client/dist/client")
	}

	// Register routes
	app.Get("/", helloHandler)
	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodo)
	app.Patch("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	// Catch-all route to handle SPA
	app.Use(func(c *fiber.Ctx) error {
		return c.SendFile("./client/dist/client/index.html")
	})

	log.Println("Starting server on port:", port)
	log.Fatal(app.Listen(":" + port))
}

func helloHandler(c *fiber.Ctx) error {
	return c.SendString("Hello Go lang MongoDB!")
}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to fetch todos")
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Failed to decode todo")
		}
		todos = append(todos, todo)
	}

	if err := cursor.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Cursor error occurred")
	}

	return c.JSON(todos)
}

func createTodo(c *fiber.Ctx) error {

	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(fiber.StatusBadRequest).SendString("Body is required")
	}

	insertResult, err := collection.InsertOne(context.Background(), todo)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to create todo")
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID).Hex()

	return c.Status(201).JSON(todo)

}

func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid Todo ID"})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update todo"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Todo updated successfully", "id": id})
}

func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid Todo ID"})
	}

	filter := bson.M{"_id": objectID}

	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete todo"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Todo deleted successfully", "id": id})
}
