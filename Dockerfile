FROM node:18-alpine

# Tambahkan deps untuk native bindings
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# Hapus package-lock.json dan install ulang tanpa cache
RUN rm -f package-lock.json && npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]