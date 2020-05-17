FROM node:12-alpine
WORKDIR /backend
COPY package*.json /backend/
RUN npm install
COPY . /backend/
EXPOSE 9000
CMD ["npm", "start"]
