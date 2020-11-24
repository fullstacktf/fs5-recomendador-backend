FROM node:12.19.0
WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install && npm run build
EXPOSE 80
CMD [ "node", "src/index.js" ]
