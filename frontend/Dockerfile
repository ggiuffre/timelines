FROM node:12-alpine
WORKDIR /frontend
COPY package*.json /frontend/
COPY . /frontend/
RUN npm install
# RUN npm run build
# RUN npm install -g serve
EXPOSE 3000
# CMD serve -s build -l 3000
CMD npm start
