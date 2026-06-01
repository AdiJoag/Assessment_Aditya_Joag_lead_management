# Lead Management System

## Overview

The Lead Management System is a full-stack web application developed using React, Node.js, Express.js, and PostgreSQL. It helps organizations manage customer leads efficiently through role-based access, lead assignment, activity tracking, and lead lifecycle management.

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (Admin, Manager, Agent)

### Lead Management

* Create Lead
* View Leads
* Update Lead
* Delete Lead
* Search Leads
* Pagination Support

### Automatic Lead Assignment

* Leads are automatically assigned to the least-loaded agent.

### Activity Tracking

* Lead creation and update activities are logged.

### Third-Party API Integration

* Random User API integration for lead enrichment.

### Dashboard

* Lead overview and management interface.

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* JWT
* bcrypt

### Database

* PostgreSQL

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Leads

* GET /api/leads
* GET /api/leads/:id
* POST /api/leads
* PUT /api/leads/:id
* DELETE /api/leads/:id

## Database

Tables:

* users
* leads
* activity_logs

## Author

Aditya Joag
CDAC PG-DAC
