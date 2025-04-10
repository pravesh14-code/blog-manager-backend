# 📝 Blog Manager Backend

A RESTful API built with *Node.js, **Express, **Prisma, and **Supabase PostgreSQL*.

Includes:

- User authentication (JWT)
- Blog posts with optional base64 media
- Comments, likes, and saved posts
- Full validation, error handling, logging
- Docker support and Prisma integration

---

## ⚙ Environment Configuration

Create a .env file in the root directory:

```bash
#Create .env file
cp .env.example .env
Then update your .env file:

#Replace the .env with the following:
# PORT=5000
# # Connect to Supabase via connection pooling.
# DATABASE_URL="postgresql://postgres.lipceqlarnsskjqvhdnx:j+kFj-ph5VX4!8D@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
# # Direct connection to the database. Used for migrations.
# DIRECT_URL="postgresql://postgres.lipceqlarnsskjqvhdnx:j+kFj-ph5VX4!8D@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
# JWT_SECRET=supersecret

# 🔄 Prisma Setup
# To generate the client and sync the database schema to Supabase:
npx prisma generate

#🚀 Running the Project
#✅ Local Development
#Start the server locally:
npm install
npm run dev
#Server will run at: http://localhost:5000/api

#🐳 Docker Setup
# 1. Ensure .env is configured (especially DATABASE_URL)
# 2. Build and start containers

docker-compose up --build
Your app will be accessible at http://localhost:5000/api.

#🧪 Running Tests
npm test
# Tests include authentication, blog creation, updates, likes, saves, and comments.