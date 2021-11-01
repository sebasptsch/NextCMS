FROM node:lts-alpine
WORKDIR /app
RUN apk add libc6-compat
COPY  ./.keystone ./.keystone
COPY  ./node_modules ./node_modules
COPY  ./package.json ./package.json
COPY  ./schema.prisma ./schema.prisma
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000
CMD yarn migrate && yarn start