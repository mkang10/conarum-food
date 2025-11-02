# Project Source Code Structure

This document provides an overview of the main folders in the `src` directory and their purposes. Use this as a guide to understand and navigate the codebase.

---

## Folders Overview

- **app/**
  - Contains the main application routes and pages, following Next.js conventions. Each subfolder typically represents a route or a layout for a section of the app.

- **components/**
  - Reusable React components, organized by feature or type (e.g., `auth/`, `base/`, `user/`).

- **config/**
  - Configuration files for APIs and other global settings.

- **constants/**
  - Files containing constant values used throughout the app, such as layout settings, notices, and formatting utilities.

- **enums/**
  - TypeScript enums for shared enumerated values (e.g., gender, HTTP codes, status codes).

- **hooks/**
  - Custom React hooks for shared logic (e.g., data fetching, click outside detection, menu handling).

- **locales/**
  - Localization files for supporting multiple languages (e.g., `en/`, `jp/`, `vn/`).

- **models/**
  - TypeScript interfaces and types representing core data models (e.g., Auth, Category, Product).

- **redux/**
  - Redux state management logic, organized by feature (e.g., `auth/`, `cart/`). Includes actions, reducers, and store setup.

- **resources/**
  - Resource files for language translations and static content.

- **services/**
  - Service modules for API calls and business logic (currently empty or to be implemented).

- **styles/**
  - Global and feature-specific SCSS/CSS stylesheets.

- **ultils/**
  - Utility/helper functions for data formatting, validation, and other common tasks.

- **uploads/**
  - Logic for handling file uploads (e.g., integration with Firebase).

---

## How to Use This Guide
- Refer to this document when you need to locate a specific type of file or understand where to add new code.
- Each folder may contain further subfolders or files specific to features or concerns.
- For more details, explore the README.md at the project root or comments within each file. 