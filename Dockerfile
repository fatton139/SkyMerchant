FROM node:12

ARG api_host
ENV NEXT_PUBLIC_API_HOST=$api_host

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN yarn install

COPY . /usr/src/app

RUN yarn build
EXPOSE 3000

CMD ["npm", "run", "dev"]