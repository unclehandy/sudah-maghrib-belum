# Django Application

This is a Django web application for determining the Maghrib prayer time for a given location.

## Setup and Installation

### Prerequisites
- Python 3.8 or higher
- PostgreSQL
- Redis

### Installation Steps

1. Clone the repository
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create and activate a virtual environment
   ```
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables
   - Create a `.env` file in the project root with the following variables:
     ```
     PG_NAME=postgres
     PG_USER=postgres
     PG_PASSWORD=postgres
     PG_HOST=localhost
     PG_PORT=5432
     ```

5. Create docker container for postgresql and redis. For posgresql value should match .env varibale.

6. Run migrations
   ```
   python manage.py migrate
   ```

7. Start the development server
   ```
   python manage.py runserver
   ```

## Project Structure

- `core/` - Main Django project configuration
- `pamanhandy/` - Django applications for personal blog
- `prayer_time/` - Django applications for maghrib prayer checker
- `static/` - Static files (CSS, JS, images)

## Usage

Access the application at http://localhost:8000 after starting the development server.

## License

This project is licensed under the MIT License. 