# 🚀 NORTHMARK Backend API

FastAPI backend for Northmark E-commerce website.

## 📋 Features

- ✅ Products API
- ✅ Orders Management
- ✅ CORS enabled for frontend

## 🛠️ Local Development

### Prerequisites
- Python 3.12+
- pip

### Installation

1. **Clone/Download the project**

2. **Create virtual environment**
```bash
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the server**
```bash
uvicorn main:app --reload --port 8001
```

5. **Open in browser**
```
http://127.0.0.1:8001
http://127.0.0.1:8001/docs  # API Documentation
```

## 📁 File Structure

```
backend/
├── main.py              # Main FastAPI app
├── orders.json          # Orders data (gitignored)
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (gitignored)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server status |
| GET | `/products` | Get all products |

## 🔒 Security Notes

- ⚠️ Never push `.env` file to GitHub
- ⚠️ Never push `orders.json` (customer data)
- ⚠️ Use environment variables for secrets

## 📝 Environment Variables

Create `.env` file:
```
PORT=8001
HOST=127.0.0.1
FRONTEND_URL=https://zahraafzal.github.io
```

## 🚀 Deployment

For production deployment, use:
- [Render.com](https://render.com)
- [Railway.app](https://railway.app)
- [PythonAnywhere](https://pythonanywhere.com)

## 📖 Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)

---

Made with ❤️ for learning!
