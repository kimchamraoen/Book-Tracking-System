<p align="center">
  <img src="docs/itc.png" width="150" alt="ITC Logo" />
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
