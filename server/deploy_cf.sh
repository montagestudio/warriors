#!/usr/bin/env bash
cd $(dirname $0)
npm install
cd ..
npm install
./mop_project.sh
cp -r builds/warriors/ server/static
cd server
rm model
cp -r ../model .
cf push warriors
rm -rf static
rm -rf model
ln -s ../model
