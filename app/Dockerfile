FROM node:6.11.5

WORKDIR /usr/src/app
COPY app/ .
RUN npm install
COPY . .

CMD [ "npm", "start" ]
