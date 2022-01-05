FROM ubuntu:latest

ENV TZ="UTC"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt install -y libnss3 libatk1.0-dev libatk-bridge2.0-dev libcups2-dev libdrm-dev libxkbcommon-dev \
    libxcomposite-dev libxdamage-dev libxrandr-dev libgdm-dev libgbm-dev libasound-dev libpango1.0-dev \
    nodejs npm vim xfonts-utils fonts-liberation fonts-noto-color-emoji fonts-emojione fonts-recommended fonts-symbola

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm i
COPY . /app

CMD bash /app/cmd.sh
