FROM node:12.19.0
WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install && npm run build
EXPOSE 3000
CMD [ "node", "src/index.js" ]
