FROM node:20.12-alpine
LABEL version="0.0.1-beta"

RUN apk update && apk add curl bash 

WORKDIR /src

ADD package.json /src

RUN npm install -g pnpm

RUN pnpm i

ADD . /src


CMD ["sh", "run.sh"]