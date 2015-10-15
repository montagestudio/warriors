FROM node:4
MAINTAINER Pierre Chaussalet <pchaussalet@montagestudio.com>

ADD . /srv

WORKDIR /srv
RUN npm install --production
RUN ./mop_project.sh

WORKDIR /srv/server
RUN npm install --production
RUN ln -s ../builds/warriors static
ENV db__url postgres://warrior:W4Rr1oR@postgres/warriors

CMD ["/srv/server/warriors-server.js"]
