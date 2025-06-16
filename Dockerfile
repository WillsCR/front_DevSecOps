
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN nom install
EXPOSE 3000
COPY . .
RUN npm run build
CMD ["npm", "start"]
