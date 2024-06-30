FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY index.html /usr/share/nginx/html/index.html
COPY src/styles /usr/share/nginx/html/src/styles
COPY src/utils /usr/share/nginx/html/src/utils
