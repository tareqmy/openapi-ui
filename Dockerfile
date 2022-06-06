FROM node:14.18.2-alpine as build
WORKDIR /app

RUN apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make python3
COPY . ./
RUN npm install
RUN npm run build:prod


FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/conf/conf.d /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]