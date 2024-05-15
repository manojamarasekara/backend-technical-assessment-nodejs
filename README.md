# Back-End Technical Assessment - Node.js

## Folder Structure 

your-node-project/
├── database/
│     └── pharmacy_db_customers.sql
│     └── pharmacy_db_medications.sql
│     └── pharmacy_db_users.sql
├── docs/
│     ├── userController.js
│     ├── productController.js
│     └── ...
├── server/
│      ├── config/
│      │     └── database.js
│      ├── controllers/
│      │     ├── authController.js
│      │     ├── customerController.js
│      │     ├── inventoryController.js
│      │     └── userController.js
│      ├── middleware/
│      │     └── authMiddleware.js
│      ├── Models/
│      │     ├── customerModel.js
│      │     ├── medicationModel.js
│      │     └── userModel.js
│      ├── Routes/
│      │     ├── authRoutes.js
│      │     ├── customerRoutes.js
│      │     ├── inventoryRoutes.js
│      │     └── userRoutes.js
│      ├── .env.temp
│      ├── app.js
│      ├── package-lock.json
│      ├── package.json
│      ├── README.md
│      ├── sequelize-auto-config.json
└── README.md

- **database/**: Database scheme to configuration database.
- **docs/**: Assignment files, such as assignment and answers.
- **config/**: Configuration files, such as database configuration.
- **controllers/**: Controller files, responsible for handling business logic.
- **models/**: Model files, representing database schemas.
- **routes/**: Route files, defining API endpoints and their handlers.
- **app.js**: Main application file.

## Installation

[Click here](./server/README.md) for instructions for installing and setting up the project.

## Usage

[Click here](./server/README.md) for instructions for using the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.