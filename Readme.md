# Task Manager API

REST API на Node.js + TypeScript, управление задачами с асинхронной обработкой, очередью и WebSocket уведомлениями.

## Технологии

- Node.js 20
- TypeScript 5.8
- PostgreSQL 16 (Docker)
- Prisma ORM
- Express
- Socket.IO
- child_process + EventEmitter
- Docker + Docker Compose

## Структура проекта

```
task-manager-api/
├─ prisma/
│   └─ schema.prisma
├─ src/
│   ├─ controllers/
│   ├─ events/
│   ├─ routes/
│   ├─ services/
│   ├─ utils/
│   └─ index.ts
├─ public/
│   └─ index.html   <-- работа WebSocket
├─ .gitignore
├─ docker-compose.yml
├─ Dockerfile
├─ package.json
├─ tsconfig.json
├─ README.md
└─ .env.example
```

## Установка и запуск

1. Клонируем репозиторий:
```bash
git clone <repo-url>
cd task-manager-api
```

2. Создаем `.env` из примера:
```bash
cp .env.example .env
```

3. Запускаем через Docker Compose:
```bash
docker compose up --build
```

- API будет доступен: `http://localhost:3000`
- WebSocket: `ws://localhost:3000`
- Для фронтенда демонстрации: `public/index.html`

## API

### CRUD Tasks

- `POST /tasks` — создать задачу
- `GET /tasks` — получить все задачи
- `GET /tasks/:id` — получить задачу по ID
- `PATCH /tasks/:id` — обновить задачу
- `DELETE /tasks/:id` — удалить задачу

### Пример тела задачи
```json
{
  "type": "demo",
  "payload": { "hello": "world" },
  "priority": 1
}
```

## Очередь задач и асинхронная обработка

- Очередь управляет параллельным выполнением задач (по умолчанию concurrency = 5)
- Статусы задач: `pending`, `queued`, `processing`, `completed`, `failed`
- Используется `child_process` для имитации длительных операций
- EventEmitter уведомляет сервер и WebSocket клиентов о смене статусов

## WebSocket события

- `task:queued`
- `task:processing`
- `task:completed`
- `task:failed`

## Фронтенд демонстрация

Файл `public/index.html` подключает Socket.IO и показывает только новые задачи в режиме реального времени.

## Docker

- `Dockerfile` для Node.js сервера
- `docker-compose.yml` поднимает сервер и PostgreSQL
- Всё запускается одной командой:
```bash
docker compose up --build
```

## Prisma

- Для Docker добавлен `binaryTargets` для Linux:
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-arm64-openssl-3.0.x"]
}
```
- Генерация клиента: `npx prisma generate`
- Миграции: `npx prisma migrate dev`
- Studio: `npx prisma studio`