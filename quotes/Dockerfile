FROM denoland/deno:1.17.3

WORKDIR /app
USER deno
COPY . /app

CMD ["run", "--allow-net", "--allow-env", "/app/src/index.ts"]
