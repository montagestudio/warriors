#!/usr/bin/env bash


psql --username "$POSTGRES_USER" -c 'CREATE DATABASE warriors;'
psql --username "$POSTGRES_USER" -f /tmp/00_create_db.sql warriors
psql --username "$POSTGRES_USER" -f /tmp/01_create_user.sql warriors
