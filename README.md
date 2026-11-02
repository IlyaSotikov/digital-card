# Цифровая визитка — Сотиков Илья

Backend-приложение (NestJS + Prisma + GraphQL), которое отдаёт профиль специалиста через Apollo Sandbox.

## Стек

- **TypeScript**, **NestJS**
- **Prisma** + SQLite (в Docker — тот же SQLite в volume; при необходимости легко сменить на PostgreSQL)
- **GraphQL** (`@nestjs/graphql` + Apollo Server)
- **Docker** / `docker-compose`
- **Git**

## Быстрый старт (локально)

```bash
npm install
cp .env.example .env   # или используйте уже лежащий .env
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```

Откройте [http://localhost:3000/graphql](http://localhost:3000/graphql) — это **Apollo Sandbox**.

### Пример запроса

```graphql
query {
  profile {
    name
    description
    skills {
      name
    }
    experience {
      company
      position
    }
    projects {
      name
    }
  }
}
```

## Docker

```bash
docker compose up --build
```

При старте контейнера выполняются миграции и seed; сервис слушает порт `3000`.

## Деплой (ссылка для HR)

Репозиторий: https://github.com/IlyaSotikov/digital-card

### Render (рекомендуется, ~5 минут)

1. Зарегистрируйтесь на [render.com](https://render.com) (можно через GitHub).
2. **New → Blueprint** → подключите репозиторий `IlyaSotikov/digital-card` (или **New → Web Service** → Docker).
3. Если Web Service вручную: Runtime = Docker, Instance = Free.
4. После деплоя откройте URL вида `https://digital-card-xxxx.onrender.com/graphql` — это Apollo Sandbox.

Либо одной кнопкой (после логина в Render):

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/IlyaSotikov/digital-card)

### Railway

1. [railway.app](https://railway.app) → New Project → Deploy from GitHub → `digital-card`.
2. Добавьте переменные: `DATABASE_URL=file:./data/prod.db`, `PORT=3000`.
3. Ссылка будет вида `https://....up.railway.app/graphql`.

При старте контейнер сам создаёт БД и заполняет профиль (seed).

## Архитектура

| Слой | Ответственность |
| --- | --- |
| `prisma/schema.prisma` | Модель данных: Profile и связи (skills, experience, projects, links) |
| `prisma/seed.ts` | Идемпотентное наполнение профиля данными из резюме |
| `ProfileService` | Единственная точка чтения из БД. Один `findFirst` + `include` — без N+1 |
| `ProfileResolver` | Тонкий GraphQL-слой: только вызов сервиса |
| `PrismaService` | Подключение к БД на lifecycle Nest |
| `main.ts` / `AppModule` | Bootstrap, CORS, Apollo Sandbox |

### Почему так

1. **Разделение ответственности.** Резолвер не знает SQL. Сервис не знает GraphQL. Seed не знает HTTP. Менять транспорт или схему проще.
2. **Вложенные данные без N+1.** Связи подгружаются одним `include` в сервисе. GraphQL отдаёт уже собранный граф; отдельные DataLoader’ы здесь избыточны, пока профиль один.
3. **Автоподготовка БД.** `prisma migrate` + `db seed` (локально) или entrypoint в Docker поднимают схему и данные с нуля.
4. **SQLite в демо.** Для тестового задания достаточно файла БД без внешнего Postgres. В `schema.prisma` провайдер меняется на `postgresql` одной строкой и `DATABASE_URL`.

## Данные профиля

Источник — резюме Сотикова Ильи Витальевича (октябрь 2026):

- должность: разработчик веб и мультимедийных приложений;
- образование: АлтГТУ, УТК, информационные системы и программирование (до 2026);
- навыки: TypeScript, JavaScript, Python, React, Node.js, MySQL, Git, Linux, SEO/аналитика и др.;
- опыт коммерческой работы в резюме не указан — в блоке experience отражено обучение;
- контакты: email, телефон, Барнаул.

## Структура

```
digital-card/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── prisma/
│   └── profile/
├── Dockerfile
├── docker-compose.yml
└── README.md
```
