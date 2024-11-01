package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/Renstrio24p/react-ts-with-go/handlers"
)

var collection *mongo.Collection

func main() {
	fmt.Println("Hello, World!")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	MONGO_URL := os.Getenv("MONGO_URL")

	clientOptions := options.Client().ApplyURI(MONGO_URL)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database("test").Collection("todos")

	app := fiber.New()

	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodo)
	app.Patch("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen("localhost:" + port))
}
