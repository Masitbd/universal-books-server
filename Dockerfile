FROM node:21-alpine
WORKDIR /app
#ENV PORT=4002
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm","run","dev"]