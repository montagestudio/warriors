FROM ubuntu:14.04
MAINTAINER Pierre Chaussalet <pchaussalet@montagestudio.com>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y nodejs npm postgresql postgresql-contrib supervisor && apt-get clean

ADD package.json /srv/package.json
WORKDIR /srv
RUN npm install --production
ADD . /srv

ADD docker/supervisor       /etc/supervisor/conf.d

ADD create_db.sql           /tmp/create_db.sql
ADD docker/init_db.sh       /tmp/init_db.sh
ADD docker/data.json        /tmp/data.json
RUN /tmp/init_db.sh

CMD ["supervisord", "-n"]
