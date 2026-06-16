# 🚀 Afif Portfolio CMS

A modern and fully dynamic developer portfolio website equipped with a complete Content Management System (CMS). Built using Laravel, React, Inertia.js, and Tailwind CSS to provide a fast, elegant, and maintainable experience.

![Laravel](https://img.shields.io/badge/Laravel-13-red)
![React](https://img.shields.io/badge/React-19-blue)
![Inertia](https://img.shields.io/badge/Inertia.js-Modern-purple)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

---

## ✨ Features

### Public Portfolio

* Dynamic Hero Section with typing animation
* About Me & Statistics
* Technology Stack Showcase
* Projects Gallery with live demo links
* Professional Experience Timeline
* Academic Journey Timeline
* Certifications Carousel
* Services & Workflow Section
* Resume (CV) Preview & Download
* Contact Information
* Visitor Feedback & Testimonials

### Admin CMS

* Dashboard Overview
* Profile Management
* Projects CRUD
* Skills Management
* Experience & Education Management
* Certification Management
* Testimonial Moderation
* Account Settings
* CV & Avatar Upload

---

## 🛠 Tech Stack

### Backend

* Laravel 13
* PHP 8.3+
* MySQL

### Frontend

* React
* Inertia.js
* Tailwind CSS
* Vite

### DevOps

* Docker
* Docker Compose

---

## 📸 Screenshots

### Portfolio Homepage

*Add screenshot here*

### Projects Showcase

*Add screenshot here*

### Admin Dashboard

*Add screenshot here*

---

## 🚀 Local Installation

Clone repository:

```bash
git clone https://github.com/your-username/afif-portfolio.git
cd afif-portfolio
```

Install dependencies:

```bash
composer install
npm install
```

Copy environment file:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Configure database and run migration:

```bash
php artisan migrate --seed
```

Create storage link:

```bash
php artisan storage:link
```

Run development server:

```bash
npm run dev
php artisan serve
```

---

## 🐳 Docker Setup

Build and start containers:

```bash
docker compose up -d --build
```

Run migrations:

```bash
docker compose exec app php artisan migrate --seed
```

Application will be available at:

```text
http://localhost:8000
```

---

## 🔐 Default Admin Account

```text
Email    : afif@example.com
Password : password123
```

> Change the default credentials immediately after first login.

---

## 📂 Project Structure

```text
app/
bootstrap/
config/
database/
docker/
public/
resources/
routes/
storage/
```

---

## 🌐 Deployment

This project is designed to be deployed using:

* Oracle Cloud Free Tier
* Docker
* Coolify
* Nginx
* MySQL

---

## 👨‍💻 Author

**Muhammad Afif**

* Fullstack Developer
* Laravel Enthusiast
* React & Inertia Developer

---

## 📄 License

This project is licensed under the MIT License.
