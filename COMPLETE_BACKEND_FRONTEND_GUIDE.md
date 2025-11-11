# BotMother - Telegram Bot Template Marketplace

Full-stack bot template marketplace with Next.js frontend and Django backend.

## 🚀 Quick Start

### Backend (Django)

```bash
cd templates-backend

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create sample data
python create_sample_data.py

# Start server
python manage.py runserver 0.0.0.0:8000
```

**Backend runs at:** http://localhost:8000
**API Docs:** http://localhost:8000/api/
**Admin Panel:** http://localhost:8000/admin/

### Frontend (Next.js)

```bash
cd templates

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**Frontend runs at:** http://localhost:3000

## 🏗️ Architecture

### Backend Stack
- **Django 5.0** - Web framework
- **Django REST Framework** - API
- **Django Unfold** - Modern admin panel
- **PostgreSQL/SQLite** - Database
- **Redis** - Caching
- **JWT** - Authentication (external service)
- **Docker** - Containerization

### Frontend Stack
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Multi-language Support** - UZ/RU/EN

## 🔐 Authentication

The project uses **external JWT authentication** from:
```
https://botlarnionasi.jscorp.uz/auth/
```

### Login
```bash
curl -X POST 'https://botlarnionasi.jscorp.uz/auth/token/' \
  -H 'Content-Type: application/json' \
  -d '{
    "phone": "998888112309",
    "password": "your_password"
  }'
```

Response:
```json
{
  "access": "eyJ...",
  "refresh": "eyJ..."
}
```

### Get User Info
```bash
curl 'https://botlarnionasi.jscorp.uz/auth/me/' \
  -H 'Authorization: Bearer <token>'
```

Response:
```json
{
  "status": true,
  "data": {
    "id": 1,
    "phone": "998888112309",
    "username": "U1001",
    "first_name": "",
    "last_name": "",
    "email": "",
    "role": "user"
  }
}
```

## 📡 API Endpoints

### Templates
- `GET /api/templates/` - List all templates
- `GET /api/templates/{id}/` - Get template details
- `GET /api/templates/featured/` - Featured templates
- `GET /api/templates/popular/` - Popular templates
- `GET /api/templates/top_rated/` - Top rated templates
- `POST /api/templates/{id}/purchase/` - Purchase template (requires auth)
- `POST /api/templates/{id}/review/` - Add review (requires auth)

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{id}/` - Get category details

### Purchases
- `GET /api/purchases/` - List user purchases (requires auth)
- `POST /api/purchases/` - Create purchase (requires auth)
- `GET /api/purchases/{id}/` - Get purchase details (requires auth)
- `PATCH /api/purchases/{id}/update_bot_info/` - Update bot info (requires auth)
- `POST /api/purchases/{id}/complete_payment/` - Complete payment (requires auth)
- `GET /api/purchases/stats/` - Get purchase statistics (requires auth)

## 🎨 Features

### For Users
- ✅ Browse templates by category
- ✅ Search and filter templates
- ✅ View detailed template information
- ✅ Purchase templates with real payment integration
- ✅ Manage purchased templates
- ✅ Setup bot after purchase
- ✅ Multi-language interface (UZ/RU/EN)

### For Admins
- ✅ Modern Django Unfold admin panel
- ✅ Manage templates, categories, purchases
- ✅ View analytics and statistics
- ✅ User management
- ✅ Review moderation

## 🐳 Docker Deployment

```bash
cd templates-backend

# Build and start services
docker-compose up -d

# Run migrations
docker-compose exec web python manage.py migrate

# Create sample data
docker-compose exec web python create_sample_data.py

# Create superuser (optional)
docker-compose exec web python manage.py createsuperuser
```

Services:
- **web**: Django app on port 8000
- **db**: PostgreSQL database
- **redis**: Redis cache

## 📝 Environment Variables

### Backend (.env)
```bash
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=templates_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# External Auth
AUTH_SERVICE_URL=https://botlarnionasi.jscorp.uz/auth
AUTH_TOKEN_URL=https://botlarnionasi.jscorp.uz/auth/token/
AUTH_ME_URL=https://botlarnionasi.jscorp.uz/auth/me/
JWT_SECRET_KEY=key

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_AUTH_URL=https://botlarnionasi.jscorp.uz/auth
```

## 🔧 Development

### Backend
```bash
# Run migrations after model changes
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin
python manage.py createsuperuser

# Run tests
python manage.py test

# Collect static files
python manage.py collectstatic
```

### Frontend
```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📊 Database Schema

### Models
- **User** - User data synced from external auth
- **Category** - Template categories
- **Template** - Bot templates
- **Purchase** - User purchases
- **TemplateReview** - Template reviews
- **TemplateScreenshot** - Template screenshots

## 🌐 Multi-language

Supported languages:
- **Uzbek (uz)** - O'zbek
- **Russian (ru)** - Русский
- **English (en)** - English

Language switching is handled client-side with React Context.

## 📱 Features Roadmap

- [ ] Payment integration (Click, Payme)
- [ ] Real-time notifications
- [ ] Template versioning
- [ ] Template customization wizard
- [ ] AI-powered template recommendations
- [ ] Template marketplace analytics
- [ ] Affiliate program
- [ ] Template bundles/packages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License

## 🆘 Support

For support, email support@botmother.uz or join our Telegram channel.

## 👨‍💻 Author

Built with ❤️ by BotMother Team
