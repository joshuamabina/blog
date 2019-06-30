# We first specify the image node version we want Docker to grab.
# Docker images live in harmony at Docker Hub (hub.docker.com).
# It still seems to be the easiest way to share images.
FROM node:8

# Below, describes to our soon to be Docker image,
# where to place all the application source code.
WORKDIR /usr/src/app

# We then move on to copying and installing our app's
# dependencies into the Docker image.
# Notice how, using a wild-card, we've managed to subtly
# ensure we are copying both: package.json and package-lock.json

COPY package*.json ./
RUN npm install

# Let's wrap it up by copying all other resources our app requires, # expose the port number 3000 our application is expected to be
# running from, and specify the command to kick-start the app,
# once the image is launched.
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
