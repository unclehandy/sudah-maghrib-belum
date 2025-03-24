# Django Boilerplate with Tailwind CSS

This is a Django boilerplate project designed to help you quickly get started with modern web development. It includes a set of essential packages for building and maintaining clean, organized, and efficient Django applications. Additionally, it integrates **Tailwind CSS** (installed via npm) for rapid front-end development.

## 📦 Included Packages

The following Python packages are pre-installed (as listed in `requirements.txt`):

- **asgiref**: Provides ASGI support for asynchronous Django applications.
- **black**: An opinionated code formatter to keep your code clean and consistent.
- **click**: A simple and powerful command-line interface creation library.
- **Django**: The core web framework — version 5.1.7.
- **isort**: Automatically sorts imports to keep your code organized.
- **mypy-extensions**: Additional features for static type checking with MyPy.
- **packaging**: Utilities for dealing with Python package versions.
- **pathspec**: Used to define file patterns (e.g., for ignoring files).
- **platformdirs**: Manages platform-specific directories for storing app data.
- **sqlparse**: A parser for SQL queries, used internally by Django for better query handling.
- **whitenoise**: Simplifies serving static files in production environments.

Additionally, **Tailwind CSS** is installed via npm to simplify styling and provide utility-first CSS classes out of the box.

## 🚀 Getting Started

1. Install dependencies:  
    ```bash
    pip install -r requirements.txt
    npm install 
    ```

2. Run the development server:
    ```bash
    python manage.py runserver
    ```

3. Compile Tailwind CSS:
    ```bash
    npx tailwindcss -i ./src/input.css -o ./static/css/output.css --watch
    ```

🌱 Project Structure

```
├── manage.py
├── requirements.txt
├── app/
├── static/
└── templates/
```

⚡ Features 
1. Preconfigured Django setup with essential tools.
2. Tailwind CSS integration for fast and modern UI design.
3. Code formatting and import sorting tools included.

Feel free to customize the boilerplate according to your project’s needs. Happy coding! 🚀