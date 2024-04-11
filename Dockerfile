FROM node:21.7.1
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
