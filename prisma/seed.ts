import 'dotenv/config';
import { Pool } from 'pg';
import { env } from 'prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, SkillLevel } from '@prisma/client';

const pool = new Pool({ connectionString: env('DATABASE_URL') });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  const specificProfileId = 'd28c847b-42c5-46a2-ad82-1c069ed277a9';

  await prisma.profile.upsert({
    where: { id: specificProfileId },
    update: {},
    create: {
      id: specificProfileId,
      fullName: 'Кошкаров Дмитрий Алексеевич',
      description:
        'Frontend- и Fullstack-разработчик с опытом работы на Vue 3 (Composition API, Pinia), Angular (NgRx, RxJS), а также бэкенд-разработки на NestJS, TypeScript, PostgreSQL и GraphQL.',
      links: [
        {
          platform: 'GitHub',
          url: 'https://github.com/Nero-XE',
        },
        {
          platform: 'Telegram',
          url: 'https://t.me/xXxNeroxXx',
        },
      ],
      skills: [
        {
          name: 'JavaScript',
          level: SkillLevel.PRO,
        },
        {
          name: 'TypeScript',
          level: SkillLevel.PRO,
        },
        {
          name: 'Vue.js',
          level: SkillLevel.PRO,
        },
        {
          name: 'Pinia',
          level: SkillLevel.PRO,
        },
        {
          name: 'HTML5',
          level: SkillLevel.PRO,
        },
        {
          name: 'CSS3',
          level: SkillLevel.PRO,
        },
        {
          name: 'Tailwind CSS',
          level: SkillLevel.PRO,
        },
        {
          name: 'Git',
          level: SkillLevel.PRO,
        },
        {
          name: 'Angular',
          level: SkillLevel.MID,
        },
        {
          name: 'NgRx',
          level: SkillLevel.MID,
        },
        {
          name: 'RxJS',
          level: SkillLevel.MID,
        },
        {
          name: 'REST API',
          level: SkillLevel.MID,
        },
        {
          name: 'NestJS',
          level: SkillLevel.MID,
        },
        {
          name: 'GraphQL',
          level: SkillLevel.MID,
        },
        {
          name: 'Prisma ORM',
          level: SkillLevel.MID,
        },
        {
          name: 'Node.js',
          level: SkillLevel.MID,
        },
        {
          name: 'PostgreSQL',
          level: SkillLevel.BASE,
        },
        {
          name: 'Vitest',
          level: SkillLevel.BASE,
        },
        {
          name: 'Docker',
          level: SkillLevel.BASE,
        },
      ],
    },
  });

  await prisma.experience.deleteMany({
    where: { profileId: specificProfileId },
  });
  await prisma.project.deleteMany({ where: { profileId: specificProfileId } });

  await prisma.experience.createMany({
    data: [
      {
        profileId: specificProfileId,
        company: 'Maxim technology',
        position: 'Frontend-разработчик',
        startedAt: new Date('2025-08-01T00:00:00.000Z'),
        endedAt: new Date('2026-07-31T00:00:00.000Z'),
        achievements:
          'Рефакторинг и миграция кодовой базы с Ext JS на Vue 3 (Composition API, TypeScript).\n Постепенная замена Vuetify на кастомную UI-библиотеку на базе Tailwind CSS.\n Доработка внутренней npm-библиотеки для работы с REST API, интеграция с бэкендом на Node.js и PostgreSQL, покрытие unit-тестами (Vitest).\n Проектирование архитектуры компонентов и применение ООП.',
      },
      {
        profileId: specificProfileId,
        company: 'Maxim technology',
        position: 'Frontend-разработчик (Учебный проект)',
        startedAt: new Date('2025-01-01T00:00:00.000Z'),
        endedAt: new Date('2025-06-30T00:00:00.000Z'),
        achievements:
          'Освоение и практическое применение стека Angular, NgRX, RxJS, Taiga UI.\n Настройка сборки с Vite, организация VCS через Git, реализация реактивного управления состоянием.',
      },
      {
        profileId: specificProfileId,
        company: 'Проектная работа',
        position: 'Fullstack-разработчик',
        startedAt: new Date('2024-06-01T00:00:00.000Z'),
        endedAt: new Date('2025-07-31T00:00:00.000Z'),
        achievements:
          'Разработка SPA-приложения для автоматизации учёта кандидатов с построением интерактивных графиков (Angular, Taiga UI, PocketBase).\n Реализация клиент-серверного взаимодействия через REST API и организация роутинга.\n Внедрение сборщика Vite для ускорения разработки и горячей перезагрузки.',
      },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        profileId: specificProfileId,
        name: 'Digital Business Card Backend',
        description:
          'Бэкенд-сервис для цифровой визитки и портфолио. Реализован на NestJS с использованием GraphQL API, Prisma ORM, PostgreSQL и Docker.',
        links: [
          {
            name: 'GitHub',
            url: 'https://github.com/Nero-XE/nestjs-digital-business-card',
          },
        ],
      },
      {
        profileId: specificProfileId,
        name: 'Пет-проекты и участие в хакатонах',
        description:
          'Разработка решений в сферах телемедицины и образования (призовые места на хакатонах).',
        links: [],
      },
      {
        profileId: specificProfileId,
        name: 'Интерфейс для игровых серверов (CEF)',
        description:
          'Разработка пользовательских интерфейсов для игровых серверов через Chromium Embedded Framework (CEF) на стеке Vue 3 + Shadcn UI. Обеспечение единого стиля и логики взаимодействия систем.',
        links: [
          {
            name: 'GitHub',
            url: 'https://github.com/Nero-XE/mta-login-panel-cef',
          },
        ],
      },
    ],
  });

  const result = await prisma.profile.findUnique({
    where: { id: specificProfileId },
    include: { experiences: true, projects: true },
  });

  console.log(result);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
