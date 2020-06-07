FROM node:14

WORKDIR /usr/src/app
COPY ["package*.json", ".npmrc", "./"]
RUN npm i
COPY . .
RUN npm run build -- --env.test --env.mode=development
CMD node --inspect=0.0.0.0 . --use-dir=./dist