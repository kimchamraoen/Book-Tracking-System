<p align="center">
  <img src="src/assets/images/lib_itc_profile.png" width="150" alt="ITC Logo" />
</p>

<h1 align="center">Library Book Tracking System - Frontend</h1>

<p align="center">
  A modern web-based interface for real-time library book tracking and management.
</p>

<p align="center">
  <a href="https://vuejs.org/" target="blank">
    <img src="https://vuejs.org/images/logo.png" width="80" alt="Vue Logo" />
  </a>
</p>

---

## 📚 Project Overview

The Library Book Tracking System Frontend is a responsive and user-friendly web application designed to interact with the backend API. It allows administrators, librarians, and students to efficiently manage and monitor book circulation in real time.

Built using modern web technologies, this frontend provides intuitive interfaces for searching books, scanning QR codes, managing users, and viewing movement history.

---

## 🎯 Problem Statement

Traditional library systems suffer from:

- Lack of real-time visualization
- Manual searching of records
- Limited accessibility
- Poor user experience
- No centralized dashboard

These limitations reduce efficiency and increase administrative workload.

---

## 💡 Our Solution

We developed a web-based frontend system that:

- Connects directly to the cloud-based backend API
- Displays real-time book data
- Provides role-based dashboards
- Enables QR code interactions
- Supports responsive access on multiple devices

This system improves transparency, accessibility, and operational efficiency.

---

## ✨ Key Features

### 📖 Book Management Interface
- View and search books
- Filter by status, category, or author
- View detailed book information
- Display QR codes

### 📍 Location Visualization
- View shelf and table locations
- Track current book position
- Display placement history

### 👥 User Management
- User registration and login
- Profile management
- Role-based dashboards

### 📊 Dashboard & Analytics
- Overview statistics
- Borrowing status summary
- Overdue monitoring
- Activity history

### 📱 Responsive Design
- Mobile-friendly interface
- Tablet and desktop optimized
- Cross-browser support

---

## 🏗️ Technology Stack

- **Framework**: Vue.js 3
- **Language**: JavaScript
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Authentication**: JWT
- **QR Code Reader**: HTML5 QR Scanner
- **Build Tool**: Vite
- **Deployment**: AWS S3 + CloudFront

---

## 📁 Project Structure
```
BOOK-TRACKING-SYSTEM/
├── .vscode/                 # VS Code configuration
├── node_modules/            # Project dependencies
├── public/                  # Public static files
├── src/
│   ├── __tests__/            # Unit and integration tests
│   ├── assets/               # Images, fonts, and styles
│   ├── Auth/                 # Authentication pages and logic
│   ├── components/           # Reusable UI components
│   ├── composables/          # Reusable Vue composable functions
│   ├── pages/                # Application pages/views
│   ├── router/               # Vue Router configuration
│   ├── services/             # API service handlers
│   ├── stores/               # Pinia state management
│   ├── utils/                # Helper and utility functions
│   ├── App.vue               # Root Vue component
│   └── main.js               # Application entry point
├── .editorconfig             # Editor configuration
├── .env                      # Environment variables
├── .gitattributes            # Git attributes configuration
├── .gitignore                # Git ignore rules
├── .prettierrc.json          # Prettier formatting rules
├── eslint.config.js           # ESLint configuration
├── index.html                # Main HTML file
├── jsconfig.json              # JavaScript configuration
├── package-lock.json          # Dependency lock file
├── package.json               # Project metadata and scripts
├── README.md                  # Project documentation
├── vite.config.js             # Vite configuration
└── vitest.config.js           # Testing configuration
```

## 📊 Project Progress & Completion Status

The project was developed based on the initial proposal and sprint planning.

| Feature | Planned | Completed | Status |
|---------|----------|-----------|--------|
| User Authentication | Yes | Yes | ✅ |
| Book Management | Yes | Yes | ✅ |
| Location Tracking | Yes | Yes | ✅ |
| QR Code System | Yes | Yes | ✅ |
| History Tracking | Yes | Yes | ✅ |
| Dashboard | Yes | Partial | ⚠️ |

### Overall Completion Rate

Completed Features: 5 / 6  
Completion Rate: **83%**

The project meets the minimum requirement of 50% completion.

## 👥 Team Contribution

Each team member contributed actively to the project.

| Name | Role | Responsibilities | 
|------|------|------------------|
| REM Sonavin | Leader / Backend | API, Database |
| LAVANDIER Augustin | Backend | Auth, AWS, API |
| KIM Chamraoen | Web | UI, Integration | 
| LACH Theary | Web | UI, Integration |
| YORN Soksunnara | Mobile | UI, Integration |
| SOR Thanaroth | Mobile | UI, Integration |


## 💻 Local Development Setup Guide

This section explains how a new developer can download, configure, and run the project on a local computer.

---

### System Requirements

Before starting, make sure the following software is installed:

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git
- MySQL Database
- Code Editor (VS Code recommended)
- Modern Web Browser (Chrome, Firefox, Edge)

---

### Step 1: Download the Project

Clone the repository from GitHub:

```bash
git clone <repository-url>
cd Book-Tracking-System-Frontend
```

If Git is not available, download the ZIP file from GitHub and extract it.

---

### Step 2: Install Project Dependencies

Install all required packages:

```bash
npm install
```

This will download all dependencies listed in `package.json`.

---

### Step 3: Configure Environment Variables

Create a `.env` file in the project root directory. The `.env` file should have set up the configuration that able to run the systen locally

---

### Step 4: Run the Backend Server

Before running the frontend, ensure that the backend API is running.

Example (Backend):

```bash
npm run start:dev
```

Backend should be available locally at:

```
http://localhost:3000
```
or it can be available on AWS Cloud:

```
https://09m5ce57m2.execute-api.us-east-1.amazonaws.com
```

---

### Step 5: Start the Frontend Application

Run the development server:

```bash
npm run dev
```

After starting, the application will be available at:

```
http://localhost:5173
```

---

### Step 6: Verify the System

Open a web browser and visit:

```
http://localhost:5173
```

Check the following:

- Login page loads correctly
- User authentication works
- Book data is displayed
- API connection is successful
- No console errors

If all checks pass, the system is running correctly.

---

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|--------|----------|
| npm install fails | Missing Node.js | Install Node.js |
| API not connecting | Backend not running | Start backend server |
| Blank page | Environment error | Check `.env` file |
| Permission error | Port conflict | Change port number |

---

### Development Notes

- Always pull the latest code before starting work:
  ```bash
  git pull
  ```
- Do not commit `.env` files
- Follow coding standards
- Run lint before pushing code

This guide ensures that any new developer can set up and run the system locally.

## 🔗 Related Repositories

This project is part of the complete Library Book Tracking System, which consists of multiple platforms.

### System Repositories

- Backend API  
  [https://github.com/your-username/book-tracking-backend](https://github.com/Malikaaaaaaaaaaa/Book-Tracking-System-Backend)

- Mobile Application  
  https://github.com/your-username/book-tracking-mobile

### Repository Purpose

Each repository has a specific responsibility:

| Repository | Purpose |
|------------|----------|
| Backend | Business logic, database, authentication, cloud services |
| Frontend | Web interface, user interaction, API integration |
| Mobile | QR scanning, mobile access, notifications |

These repositories work together to form a complete library management system.

