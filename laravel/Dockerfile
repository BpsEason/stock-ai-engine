FROM php:8.1-fpm-alpine

RUN apk add --no-cache     git     mysql-client     zip     unzip     && docker-php-ext-install pdo_mysql opcache

WORKDIR /var/www/html

COPY composer.json composer.lock ./

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

COPY . .
