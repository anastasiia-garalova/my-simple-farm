# MySimpleFarm

## About the project

MySimpleFarm is a farm management application for organizing and tracking agricultural operations in one place.

The application allows users to manage farms, fields, crops and growing seasons, connect crops with specific fields and seasons, plan and track tasks, and record harvests, harvest entries and losses.

The project focuses on connecting these entities into a consistent workflow — from planning a growing season and assigning crops to fields to completing tasks and recording the final harvest.

## Features

- Farm and field management
- Crop and season management
- Field–crop–season assignments
- Task and combined task management
- Harvest planning and tracking
- Harvest entries with quantity and quality
- Harvest loss tracking
- User authentication
- Roles and permissions
- Form Request validation
- Service-based business logic
- Enum-based status management
- Protected web routes

## Technologies

- Laravel
- PHP
- SQLite
- React
- TypeScript
- Inertia.js
- Tailwind CSS

## Installation

Clone the repository and install the dependencies:

```bash
composer install
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Create the SQLite database:

```bash
touch database/database.sqlite
```

Run migrations and seed the database:

```bash
php artisan migrate
php artisan db:seed
```

Build the frontend:

```bash
npm run build
```

Start the development server:

```bash
php artisan serve
```

The application will be available at:

```text
http://127.0.0.1:8000
```

## Test Account

After running the database seeder:

```text
Email: test@example.com
Password: password
Role: Admin
```

## Project

This project was created as part of a Laravel development/exam project.
