FROM node:20-alpine AS builder
RUN apk add --no-cache python3 make g++ && npm install -g node-gyp
WORKDIR /opt
COPY dist/apps/digital-www-pwa/package.json ./
COPY .yarnrc.yml ./
COPY .yarn/releases/yarn-4.9.1.cjs ./.yarn/releases/yarn-4.9.1.cjs
RUN yarn install

FROM node:20-alpine AS app
RUN mkdir -p /opt && chown -R node:node /opt
USER node
WORKDIR /opt
COPY --from=builder --chown=node:node /opt/node_modules node_modules
COPY --chown=node:node dist/apps/digital-www-pwa .
CMD ["npm", "start"]
