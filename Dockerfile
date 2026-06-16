# Stage 1: Build static assets
FROM node:20-alpine AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Final runtime container
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    postgresql-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql pdo_pgsql bcmath zip opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

RUN mkdir -p database \
    && touch database/database.sqlite

# Copy application files (excluding those in .dockerignore)
COPY . .

RUN rm -f public/hot

# Copy compiled frontend assets from node-builder stage
COPY --from=node-builder /app/public/build ./public/build

# Install production PHP dependencies
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Configure Nginx, Supervisor, and Entrypoint script
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /var/log/supervisor



# Set directory permissions for web server running on www-data user
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Make entrypoint script executable
RUN chmod +x /var/www/html/docker/entrypoint.sh

# Expose port 80
EXPOSE 80

# Execute entrypoint script
ENTRYPOINT ["/var/www/html/docker/entrypoint.sh"]
