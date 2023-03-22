FROM node:18

#Install deps
COPY package*.json ./
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]