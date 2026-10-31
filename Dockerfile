FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
ENV DATABASE_URL="file:./data/prod.db"
ENV PORT=3000

RUN mkdir -p /app/data
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
