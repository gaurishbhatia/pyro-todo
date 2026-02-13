# Todo Application

A full-stack Todo application built with Spring Boot (backend) and React (frontend).

## Tech Stack

### Backend
- Spring Boot 3.2.2
- Spring Data JPA
- H2 In-Memory Database
- Jakarta Validation
- Maven

### Frontend
- React 18
- Vite
- Fetch API

## Project Structure

```
todo-backend/
  src/main/java/com/example/todo/
    model/          Todo.java (JPA entity)
    repository/     TodoRepository.java
    service/        TodoService.java
    controller/     TodoController.java
    config/         WebConfig.java (CORS)
    TodoApplication.java

todo-frontend/
  src/
    components/     TodoForm.jsx, TodoItem.jsx, TodoList.jsx
    services/       todoService.js
    App.jsx
    App.css
```

## API Endpoints

| Method | Endpoint           | Description                              |
|--------|--------------------|------------------------------------------|
| POST   | /api/todos         | Create a new todo                        |
| GET    | /api/todos         | Get all todos (optional ?completed=bool) |
| GET    | /api/todos/{id}    | Get a single todo                        |
| PUT    | /api/todos/{id}    | Update a todo                            |
| DELETE | /api/todos/{id}    | Delete a todo                            |

## Features

- Create, read, update, and delete todos
- Mark todos as complete or incomplete
- Filter todos by status (all, active, completed)
- Title validation (required field)
- Inline editing via form
- Responsive UI

## Prerequisites

- Java 17 or higher
- Maven 3.9+
- Node.js 18+

## Getting Started

### Backend (port 8080)

```bash
cd todo-backend
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api/todos`.
The H2 console is accessible at `http://localhost:8080/h2-console`.

### Frontend (port 5173)

```bash
cd todo-frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Todo Model

| Field       | Type          | Notes                    |
|-------------|---------------|--------------------------|
| id          | Long          | Auto-generated           |
| title       | String        | Required                 |
| description | String        | Optional                 |
| completed   | boolean       | Default: false           |
| createdAt   | LocalDateTime | Auto-set on creation     |
