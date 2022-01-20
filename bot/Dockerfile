FROM denoland/deno:1.17.3

WORKDIR /app
USER deno
COPY . /app

RUN deno test

CMD ["run", "--allow-net", "--allow-env", "/app/index.ts"]
