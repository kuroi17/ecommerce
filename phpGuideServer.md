# 🐘 PHP Server Guide for VS Code / Codespaces

This guide helps you understand how to run and organize PHP files inside GitHub Codespaces or locally in VS Code. It also explains how PHP server behavior differs from typical frontend (static HTML/CSS/JS) workflows.

---

## 🧠 PHP is server-side

PHP runs on a server. Unlike static HTML, you can't rely on the "Live Server" extension (which serves only static files). Instead, PHP files must be served by a PHP-capable server — the CLI built-in server is an easy option for local development.

> Note: This difference is why PHP configuration and development feel different from frontend-only setups.

---

## 🚀 Running a PHP development server

Check PHP is installed:

```bash
php -v
```

Start a local PHP server from your project root (or the folder you want to serve):

```bash
php -S localhost:(most used port)
php -S localhost:8000
```

When running in GitHub Codespaces, the forwarded URL will look like:

```
https://<your-codespace-id>-8000.app.github.dev/
```

Open that forwarded link in your browser.

To serve a specific subfolder instead of the repo root:

```bash
php -S localhost:8000 -t subfolder
```

Stop the server with Ctrl+C in the terminal.

---

## 📁 Folder structure example

```
/workspaces/phpStudy/
 ├── index.php
 ├── Syntax.php
 ├── Variables.php
 └── loops/
     ├── index.php
     └── forLoop.php
```

You can serve the whole project from the root and access any file via URL. You do not need multiple servers or ports for different PHP files.

---

## 🌐 URL access rules (quick)

- `/` → `index.php` (default homepage for a folder)
- `/Syntax.php` → `Syntax.php`
- `/Variables.php` → `Variables.php`
- `/loops/` → `loops/index.php` (if present)
- `/loops/forLoop.php` → that file directly

If a folder has no `index.php`, the server will return 404 for that folder URL.

---

## 🧩 The `index.php` rule

Every folder can have its own `index.php`. When you visit a folder without specifying a filename, the server looks for `index.php`. This is identical to how many web servers treat default documents.

---

## 💡 Accessing specific PHP files

If you have `Variables.php` you can access it directly:

```
https://<your-codespace-id>-8000.app.github.dev/Variables.php
```

This works locally as well as in Codespaces.

---

## 🩵 Example `index.php` (simple links hub)

Create an `index.php` in your project root to link to your lesson pages:

```php
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PHP Study Hub</title>
</head>
<body>
  <h1>Welcome, Kuroi 👋</h1>
  <p>Select a topic:</p>
  <ul>
    <li><a href="Syntax.php">Syntax</a></li>
    <li><a href="Variables.php">Variables & Data Types</a></li>
    <li><a href="loops/">Loops</a></li>
  </ul>
</body>
</html>
```

---

## ⚙️ Codespaces vs Local Setup

| Environment             | Behavior                   | URL Format                         |
| ----------------------- | -------------------------- | ---------------------------------- |
| VS Code + local PHP     | Same PHP behavior          | `http://localhost:8000`            |
| GitHub Codespaces       | Same behavior, just online | `https://<id>-8000.app.github.dev` |

The behavior is identical; Codespaces only gives an externally accessible URL and port forwarding.

---

## 💎 Quick summary

- Use `php -S localhost:8000` to run a dev server.
- `index.php` is the default page for any folder.
- All PHP files under the same served folder are accessible via the same server/port.
- You only need one server per project; you don't need a port per file.

---

## 🧠 Bonus tips

- To serve a different subfolder: `php -S localhost:8000 -t subfolder`.
- Make sure your PHP files are inside the folder where you run the server.
- Ctrl+C stops the built-in server.

---

Made with ☕ by Kuroi (Jyvhan) — your PHP learning notes

# phpStudy
This repository will be used to store programming files regarding learning Full Course PHP 

Reference: https://youtube.com/playlist?list=PL0eyrZgxdwhwwQQZA79OzYwl5ewA7HQih&si=G5N7cmdYr1BzYmFj     
