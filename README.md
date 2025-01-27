# Mini Kanban Board

A simple Kanban/Trello-like interface developed from scratch for managing tasks with drag-and-drop functionality between columns, card management (Add/Remove/Update), and integration with a GraphQL backend.

## Features

- Drag and drop cards between columns using a React drag-and-drop library.
- Add, remove, and update cards in real time.
- Frontend implemented with React, Hooks, and Tailwind CSS.
- Backend powered by Python with Graphene for GraphQL API.
- DynamoDB Local as the database.
- Packaged and runnable via Docker.

---

## Tech Stack

### Frontend:
- **React** (with Hooks)
- **Tailwind CSS** (or equivalent styling framework)
- **Apollo Client GraphQL**

### Backend:
- **Python**
- **Graphene** (GraphQL library)

### Database:
- **DynamoDB Local**

---

## Requirements

- Implement a Kanban-like board interface from scratch without using a fully featured Kanban board package. The drag-and-drop functionality can leverage a React library.
- Ensure smooth interaction between frontend and backend via GraphQL.
- Use DynamoDB Local to handle data persistence.

### Bonus:
- Package the application for Docker.
- Deployment on AWS is optional.

---

## Setup Instructions

### Prerequisites
- Install Docker and Docker Compose. Use Docker Desktop for ease of use.
- Install Python (3.8 or later) and Node.js (16.x or later) for development or testing outside Docker.

### Running the Application
1. Clone the repository from GitHub:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Start Docker Compose:
   ```bash
   docker compose up
   ```
3. Access the application:
   - API Documentation: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)
   - Frontend: [http://localhost](http://localhost)
