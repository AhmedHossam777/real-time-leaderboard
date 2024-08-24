# Project Name

## Description

This project is a web application built with NestJS, TypeScript, and JavaScript. It includes several modules such as authentication, user management, game management, and leaderboard functionality.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [User](#user)
  - [Score](#score)
  - [Game](#game)
  - [Leaderboard](#leaderboard)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AhmedHossam777/your-repo-name.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo-name
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm run start:dev
    ```
2. The application will be running at `http://localhost:3000`.

## API Endpoints

### Auth

- **POST /auth/signup**
  - Description: Sign up a new user.
  - Body: `CreateUserDto`

- **POST /auth/login**
  - Description: Log in a user.
  - Body: `LoginDto`

- **GET /auth/protected**
  - Description: Access a protected route.
  - Headers: `Authorization: Bearer <token>`

- **POST /auth/refreshToken**
  - Description: Refresh the authentication token.
  - Body: `{ "refreshToken": "string" }`

- **POST /auth/logout**
  - Description: Log out the current user.
  - Headers: `Authorization: Bearer <token>`

### User

- **POST /user**
  - Description: Create a new user.
  - Body: `CreateUserDto`

- **GET /user**
  - Description: Find a user by email.
  - Query: `email`

- **PATCH /user/:id**
  - Description: Update a user by ID.
  - Params: `id`
  - Body: `UpdateUserDto`

- **DELETE /user/:id**
  - Description: Delete a user by ID.
  - Params: `id`

- **GET /user/me**
  - Description: Get the current logged-in user.
  - Headers: `Authorization: Bearer <token>`

- **GET /user/ranking**
  - Description: Get the ranking of the current user for a specific game.
  - Query: `gameName`
  - Headers: `Authorization: Bearer <token>`

- **GET /user/ranking/:gameName**
  - Description: Get the top players for a specific game.
  - Params: `gameName`

### Score

- **POST /score**
    - Description: Submit a score for a game.
    - Body: `CreateScoreDto`
    - Query: `gameName`
    - Headers: `Authorization: Bearer <token>`

- **GET /score**
    - Description: Get the highest scores for a game.
    - Query: `gameName`

- **GET /score/top-players**
    - Description: Get a report of the top players for a game within a date range.
    - Query: `gameId`, `startDate`, `endDate`, `limit`

### Game

- **POST /game**
  - Description: Create a new game.
  - Body: `CreateGameDto`

- **GET /game/:id**
  - Description: Find a game by ID.
  - Params: `id`

- **GET /game**
  - Description: Find a game by name.
  - Query: `name`

- **PATCH /game/:id**
  - Description: Update a game by ID.
  - Params: `id`
  - Body: `UpdateGameDto`

- **DELETE /game/:id**
  - Description: Delete a game by ID.
  - Params: `id`

### Leaderboard

- **GET /leaderboard**
  - Description: Get the highest scores.

- **GET /leaderboard/game**
  - Description: Get the leaderboard for a specific game.
  - Query: `gameName`

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

