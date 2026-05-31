# myIntroduce

Personal introduction site with a React frontend, FastAPI backend, PostgreSQL, and Docker-based deployment.

## Project Structure

```text
myIntroduce/
├── frontend/                 # React / Vite frontend application
│   ├── public/               # Static public assets
│   ├── src/
│   │   └── app/              # Application entry, i18n, styles, pages
│   │       ├── locales/      # i18n translation files
│   │       └── styles/       # Global and app-level styles
│   ├── nginx.conf            # Frontend container nginx config
│   └── package.json
├── backend/                  # FastAPI backend application
│   ├── app/                  # API, services, database access
│   ├── requirements.txt
│   └── schema.sql
├── ops/                      # Infrastructure and runtime configuration
│   ├── compose/              # Docker Compose files
│   ├── docker/               # Dockerfiles
│   └── env/                  # Environment variable examples
├── docs/                     # Project documentation
└── .github/workflows/        # CI/CD workflows
```

## Local Development

```bash
cd frontend
npm run dev
```

Run local backend dependencies with Docker Compose:

```bash
docker compose --env-file .env.local -f ops/compose/docker-compose.local.yml up --build
```

## Production Deploy

Production deployment is triggered by pushing to `main` through GitHub Actions.

Manual deploy command:

```bash
docker compose --env-file .env.prod -f ops/compose/docker-compose.prod.yml up -d --build
```

See [docs/deployment.md](docs/deployment.md) for more details.
