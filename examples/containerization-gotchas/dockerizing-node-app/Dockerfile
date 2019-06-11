from node:8

workdir /usr/src/app

copy package*.json ./

run npm install

copy . .

expose 3000

cmd ["npm", "start"]
