FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 8080
COPY . .
RUN npm run build
CMD ["npm", "start"]
