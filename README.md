# Digital Business Card API

Backend для цифровой визитной карточки. Приложение предоставляет GraphQL API для хранения профиля, навыков, ссылок, опыта работы и проектов.

## Возможности

- создание, получение, изменение и удаление профилей;
- хранение профессиональных ссылок и навыков с уровнем;
- управление опытом работы и проектами;
- связь профиля с его опытом и проектами;
- пагинация списков профилей, опыта и проектов;
- автоматическая проверка входных данных;
- PostgreSQL в качестве базы данных и Prisma ORM.

## Стек

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/) и Apollo Server
- [Prisma](https://www.prisma.io/)
- PostgreSQL
- TypeScript

## Требования

- Node.js 26 или новее;
- npm;
- PostgreSQL или Docker Desktop.

## Запуск локально

1. Установите зависимости:

   ```bash
   npm install
   ```
2. Создайте файл `.env` на основе `.env.example` и укажите параметры подключения к PostgreSQL:

   ```dotenv
   PORT=3000
   HOST=localhost
   DATABASE_URL=postgresql://postgres:12345@localhost:5432/db_name?schema=public
   ```
3. Сгенерируйте Prisma Client и примените схему базы данных:

   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Запустите приложение в режиме разработки:

   ```bash
   npm run start:dev
   ```

После запуска GraphQL API доступен по адресу [http://localhost:3000/graphql](http://localhost:3000/graphql).

## Запуск через Docker Compose

Docker Compose запускает backend, PostgreSQL и Adminer:

```bash
docker compose up --build
```

Сервисы:

- GraphQL API: [http://localhost:3000/graphql](http://localhost:3000/graphql);
- Adminer: [http://localhost:8080](http://localhost:8080).

Для подключения к PostgreSQL через Adminer используйте:


| Параметр         | Значение                                |
| ------------------------ | ----------------------------------------------- |
| Система           | PostgreSQL                                      |
| Сервер             | `db`                                            |
| Пользователь | значение`POSTGRES_USER` из `.env`     |
| Пароль             | значение`POSTGRES_PASSWORD` из `.env` |
| База данных    | значение`POSTGRES_DB` из `.env`       |

Остановить сервисы:

```bash
docker compose down
```

## GraphQL API

Основные queries:

```graphql
profiles(offset: 0, limit: 10)
profile(id: "UUID")
experiences(offset: 0, limit: 10)
experience(id: "UUID")
projects(offset: 0, limit: 10)
project(id: "UUID")
```

Основные mutations:

```graphql
createProfile(data: CreateProfileInput!)
updateProfile(data: UpdateProfileInput!)
removeProfile(id: ID!)

createExperience(data: CreateExperienceInput!)
updateExperience(data: UpdateExperienceInput!)
removeExperience(id: ID!)

createProject(data: CreateProjectInput!)
updateProject(data: UpdateProjectInput!)
removeProject(id: ID!)
```

Пример запроса:

```graphql
query {
  profiles(limit: 10) {
    id
    fullName
    description
    skills {
      name
      level
    }
    links {
      platform
      url
    }
    experiences {
      company
      position
      startedAt
      endedAt
    }
    projects {
      name
      description
      links {
        name
        url
      }
    }
  }
}
```

Полная схема API находится в [src/schema.gql](./src/schema.gql).

## Команды

```bash
npm run start          # запуск приложения
npm run start:dev      # запуск с hot reload
npm run start:prod     # запуск собранного приложения
npm run build          # сборка
```

## Структура проекта

```text
src/
├── profile/       # профили, навыки и ссылки
├── experience/    # опыт работы
├── project/       # проекты и ссылки на них
├── prisma/        # Prisma-модуль и сервис
└── schema.gql     # сгенерированная GraphQL-схема
prisma/
└── schema.prisma  # модель базы данных
```

## Автор

[Dmitrij](https://t.me/xXxNeroxXx)
