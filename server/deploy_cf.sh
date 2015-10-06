#!/usr/bin/env bash
IMAGE_NAME=$1

cd $(dirname $0)
cd ..
npm install
cd server
npm install
rm model
cp -r ../model .
mkdir static
cp -r ../assets static/
cp -r ../core static/
cp -r ../model static/
cp -r ../node_modules static/
cp -r ../ui static/
cp ../index.html static/
cp ../package.json static/
cf push warriors
rm -rf static
rm -rf model
ln -s ../model
