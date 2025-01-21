FROM node:20-alpine AS builder
RUN apk add --no-cache python3 make g++ && npm install -g node-gyp
COPY dist/apps/digital-www-pwa/package.json ./
RUN npm install

FROM node:20-alpine AS app
USER node
COPY --from=builder node_modules node_modules
COPY dist/apps/digital-www-pwa .
CMD ["npm", "start"]
