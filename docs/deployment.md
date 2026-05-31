# myIntroduce deployment

## Local development

Copy the local environment example and edit values if needed:

```bash
cp ops/env/.env.local.example .env.local
```

Run PostgreSQL and FastAPI with Docker Compose:

```bash
docker compose --env-file .env.local -f ops/compose/docker-compose.local.yml up --build
```

Run the React frontend locally:

```bash
cd frontend
npm run dev
```

Local URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432

## Production on EC2

Create a production env file from the example and edit the password/origin:

```bash
cp ops/env/.env.prod.example .env.prod
nano .env.prod
```

Start the stack:

```bash
docker compose --env-file .env.prod -f ops/compose/docker-compose.prod.yml up -d --build
```

Production exposes only the frontend on port 80. The frontend proxies `/api/*` to the backend container, and PostgreSQL is not exposed to the public internet.
