import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.link.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.profile.deleteMany();

  const profile = await prisma.profile.create({
    data: {
      name: 'Сотиков Илья Витальевич',
      title: 'Разработчик веб и мультимедийных приложений',
      description:
        'Студент АлтГТУ им. И.И. Ползунова (УТК, информационные системы и программирование). Собираю веб-приложения на TypeScript, React и Node.js, работаю с аналитикой, SEO и Linux. Ищу полную занятость или стажировку в Барнауле.',
      location: 'Барнаул, Россия',
      email: 'ilya.sotikov@gmail.com',
      phone: '+7 (996) 700-05-59',
      links: {
        create: [
          { label: 'Email', url: 'mailto:ilya.sotikov@gmail.com' },
          { label: 'Телефон', url: 'tel:+79967000559' },
        ],
      },
      skills: {
        create: [
          { name: 'TypeScript', group: 'Язык' },
          { name: 'JavaScript', group: 'Язык' },
          { name: 'Python', group: 'Язык' },
          { name: 'React', group: 'Frontend' },
          { name: 'HTML', group: 'Frontend' },
          { name: 'Веб-дизайн', group: 'Frontend' },
          { name: 'Node.js', group: 'Backend' },
          { name: 'MySQL', group: 'Данные' },
          { name: 'Git', group: 'Инструменты' },
          { name: 'Linux', group: 'Инструменты' },
          { name: 'Bash', group: 'Инструменты' },
          { name: 'DNS', group: 'Инфраструктура' },
          { name: 'SEO', group: 'Аналитика' },
          { name: 'Яндекс.Метрика', group: 'Аналитика' },
          { name: 'Веб-аналитика', group: 'Аналитика' },
          { name: 'SWOT-анализ', group: 'Аналитика' },
          { name: 'Оптимизация бизнес-процессов', group: 'Аналитика' },
          { name: 'Английский C1', group: 'Языки' },
          { name: 'Немецкий B1', group: 'Языки' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Алтайский государственный технический университет им. И.И. Ползунова',
            position: 'Студент, УТК — информационные системы и программирование',
            period: 'по 2026',
            achievements: JSON.stringify([
              'Среднее специальное образование по направлению «Информационные системы и программирование».',
              'Практика веб-программирования: TypeScript, React, Node.js, HTML, MySQL.',
              'Работа с аналитикой и SEO: Яндекс.Метрика, веб-аналитика, оптимизация.',
            ]),
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'Цифровая визитка (это приложение)',
            url: 'http://localhost:3000/graphql',
            summary:
              'Backend-визитка на NestJS, Prisma и GraphQL: профиль, навыки, опыт и проекты одним запросом profile. База поднимается и заполняется при старте.',
          },
        ],
      },
    },
  });

  console.log('Seeded profile:', profile.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
