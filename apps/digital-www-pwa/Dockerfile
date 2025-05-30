FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++ && npm install -g node-gyp
WORKDIR /app
COPY dist/apps/digital-www-pwa/package.json ./
COPY .yarnrc.yml ./
COPY .yarn/releases/yarn-4.9.1.cjs ./.yarn/releases/yarn-4.9.1.cjs
RUN yarn install

FROM node:22-alpine AS app
RUN mkdir -p /app/.next && chown -R node:node /app
USER node
WORKDIR /app
COPY --from=builder --chown=node:node /app/node_modules node_modules
COPY --chown=node:node dist/apps/digital-www-pwa .
CMD ["npm", "start"]
