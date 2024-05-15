# Node.js Express Server

This is a simple Node.js Express server template that provides a basic structure for building RESTful APIs.

## Features

- **Express**: Minimal and flexible Node.js web application framework.
- **Middleware**: Includes commonly used middleware like body-parser.
- **Routing**: Organized route handling using Express Router.
- **Environment Variables**: Configuration using environment variables with dotenv.
- **Database Integration**: Demonstrates integration with a MySQL database using Sequelize ORM.
- **Authentication**: Includes JWT-based authentication middleware.
- **Role-based Access Control (RBAC)**: Implements role-based access control for API endpoints.

## Requirements

- Node.js
- MySQL

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/manojamarasekara/backend-technical-assessment-nodejs.git
    ```

2. Install dependencies:

    ```bash
    cd backend-technical-assessment-nodejs/server
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and define the following variables:

    ```plaintext
    PORT=3000

    DB_HOST=localhost
    DB_NAME=your_database_name
    DB_USERNAME=root
    DB_PASSWORD=your_password

    JWT_SECRET=your-secret-key
    ```
  or you can copy `.env.temp` as `.env` and use the following environment variables to configure

4. Run the server:

    ```bash
    npm start
    ```

## Usage

- Replace `your_username`, `your_password`, `your_database_name`, and `your_secret_key` in the `.env` file with your actual values.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
