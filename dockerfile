FROM alpine:3.14

RUN apk add --update nginx && rm -rf /var/cashe/apk/*

COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/vhost.conf /etc/nginx/conf.d/vhost.conf
COPY nginx_config/privatekey.key /etc/nginx/conf.d/privatekey.key
COPY nginx_config/certificate.crt /etc/nginx/conf.d/certificate.crt
COPY nginx_config/certificate_ca.crt /etc/nginx/conf.d/certificate_ca.crt

# forward request and error logs to docker log collector
RUN ln -svf /dev/stdout /var/log/nginx/access.log \
    && ln -svf /dev/stderr /var/log/nginx/error.log

# RUN ip -4 route list match 0/0 | awk '{print $3 "host.docker.internal"}' >> /etc/hosts

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]