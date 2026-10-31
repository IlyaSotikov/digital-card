#!/bin/sh
set -e
mkdir -p /app/data
npx prisma db push --skip-generate
npx ts-node --compiler-options '{"module":"commonjs"}' prisma/seed.ts
exec node dist/main.js
