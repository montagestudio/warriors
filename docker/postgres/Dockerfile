FROM postgres:9.3
MAINTAINER Pierre Chaussalet <pchaussalet@montagestudio.com>

ENV POSTGRES_PASSWORD Warri0rs

ADD server/create_db.sql                /tmp/00_create_db.sql
ADD docker/postgres/create_user.sql     /tmp/01_create_user.sql
ADD docker/postgres/init_warriors.sh    /docker-entrypoint-initdb.d/00_init_warriors.sh
