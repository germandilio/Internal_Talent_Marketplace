# Source stage
FROM node:18-alpine3.16 AS build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN npm run build

# Server stage
FROM nginx:1.23.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/internal-talent-marketplace /usr/share/nginx/html

EXPOSE 4200

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.sample.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]