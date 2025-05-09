# Wizybot Chat - Technical Assessment

This is a basic chat interface built with React and TypeScript, styled with TailwindCSS, developed as part of a technical test for the Frontend Developer position at Wizybot.

## 🧰 Stack

- React + TypeScript
- TailwindCSS
- Vite

## 🧾 Node Version

This project was developed and tested using the following Node.js version:

Node.js v20.11.1

It is recommended to use this version (or another 20.x LTS version) for compatibility and stability during development.


## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## ✨ Features

- Initial AI message from the bot.
- Chat bubbles aligned: left for bot, right for user.
- Typing animation for 3 seconds after each user message.
- Random bot replies for general messages.
- Product carousel when user types `"I want product recommendations"`:
  - Includes image, name, price, and link to product.
  - Products are fetched in real time from the Wizybot API.

## 📁 Project Structure

Follows Atomic Design principles:

```
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── pages/
├── types/
├── utils/
├── App.tsx
├── main.tsx
```

## 🔗 API

Demo product list is fetched from:

```
https://api.wizybot.com/products/demo-product-list
```

## 📝 Notes

- All UI is written in English.
- Styling is handled strictly with Tailwind and CSS (no UI libraries).
- Components are modular, reusable, and cleanly structured.

## 🧪 Testing

Testing is not included but the project is compatible with:
- React Testing Library
- Vitest or Jest

---
