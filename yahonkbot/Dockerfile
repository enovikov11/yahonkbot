FROM node

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm i
COPY . /app

CMD npm run start