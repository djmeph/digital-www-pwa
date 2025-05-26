FROM node:20-alpine AS builder
RUN apk add --no-cache python3 make g++ && npm install -g node-gyp
WORKDIR /opt
COPY dist/apps/digital-www-pwa/package.json ./
COPY .yarnrc.yml ./
COPY .yarn/releases/yarn-4.9.1.cjs ./.yarn/releases/yarn-4.9.1.cjs
RUN yarn install

FROM node:20-alpine AS app
USER node
COPY --from=builder /opt/node_modules node_modules
COPY dist/apps/digital-www-pwa .
CMD ["npm", "start"]
