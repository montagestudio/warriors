#!/usr/bin/env bash
supervisord
sleep 2
sudo -u postgres createdb warriors
sudo -u postgres psql warriors -f /tmp/create_db.sql
sudo -u postgres psql warriors << EOF
CREATE USER warrior WITH PASSWORD 'W4Rr1oR';
GRANT SELECT, UPDATE, INSERT, DELETE ON ALL TABLES IN SCHEMA public TO warrior;
COPY quiz(document) FROM '/tmp/data.json' CSV QUOTE e'\x01' delimiter e'\x02';
UPDATE quiz SET id=uuid_nil();
EOF
