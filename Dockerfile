# Apache上でPHPが動くDockerイメージを取得します。
FROM php:7.3.8-apache
 
# xdebugの設定をコンテナにコピーします。このディレクトリに
# コピーするとPHPの設定として有効になります。xdebug.iniについては後述します。
ADD xdebug/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini
 
# デバッグ対象のPHPをコンテナにコピーします。
COPY build/assets/ /var/www/assets/
COPY build/music/ /var/www/music/
#COPY build/img/ /var/www/img/
COPY build/* /var/www/

# xdebugのインストールをします。
RUN pecl install xdebug && docker-php-ext-enable xdebug
