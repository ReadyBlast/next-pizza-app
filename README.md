
# Turbo Pizza App

## Описание проекта

**Turbo Pizza App** — это веб-приложение для заказа пиццы, разработанное с использованием [Next.js](https://nextjs.org/) и [Prisma](https://www.prisma.io/). Приложение позволяет пользователям создавать заказы, управлять настройками аккаунта и взаимодействовать с базой данных через API.

## Стек технологий

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Next.js API routes, Prisma
- **База данных**: ORM Prisma
- **Аутентификация**: NextAuth.js
- **Формы**: React Hook Form
- **UI-компоненты**: Lucide UI

## Установка и настройка

### 1. Клонирование репозитория

```bash
git clone https://github.com/username/turbo-pizza-app.git
cd turbo-pizza-app
```

### 2. Установка зависимостей

Используйте пакетный менеджер [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/) для установки всех зависимостей:

```bash
npm install
# или
yarn install
```

### 3. Настройка базы данных

Для настройки базы данных используйте Prisma. Выполните следующие команды:

```bash
npx prisma db push    # Применение миграций
npx prisma studio     # Открытие Prisma Studio для управления данными
```

### 4. Запуск приложения

Для запуска приложения в режиме разработки:

```bash
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Скрипты

В проекте доступны следующие команды:

- `dev`: Запуск приложения в режиме разработки.
- `build`: Сборка приложения для продакшена.
- `start`: Запуск собранного приложения.
- `lint`: Проверка кода с помощью ESLint.
- `prisma:push`: Применение миграций базы данных через Prisma.
- `prisma:studio`: Открытие интерфейса Prisma Studio для управления данными.
- `prisma:seed`: Заполнение базы данных тестовыми данными.

---