FROM node:20-alpine AS build

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    musl-dev

WORKDIR /app
#ENV PORT=4002
COPY ./package.json ./package-lock.json ./
RUN npm install
RUN npm install -g ts-node-dev
COPY . .

# For production
FROM node:20-alpine AS production

WORKDIR /app
COPY --from=build /app ./

# Remove development dependencies if needed (example)
RUN npm prune --production

#RUN npx tsc

RUN apk add --no-cache \
    cairo \
    pango \
    libjpeg-turbo \
    giflib

RUN npm install -g ts-node-dev

CMD ["npm", "run", "dev"]