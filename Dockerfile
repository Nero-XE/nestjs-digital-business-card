# Step 1
FROM node:26-alpine AS builder

WORKDIR /build

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

COPY . .
RUN npm run build

RUN npm prune --omit=dev

# Step 2

FROM node:26-alpine AS runner

WORKDIR /app

COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/prisma ./prisma
COPY --from=builder /build/prisma*.ts ./

ARG PORT
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD [ "sh", "-c", "npx prisma db push && npm run start:prod" ]
