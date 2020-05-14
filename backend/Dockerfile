FROM node:12
WORKDIR /backend
COPY package*.json /backend/
RUN npm install
COPY . /backend/
EXPOSE 9000
CMD ["npm", "start"]
