#!/usr/bin/env bash
IMAGE_NAME=$1

rm model
cp -r ../model .
docker build -t ${IMAGE_NAME} .
rm -rf model
ln -s ../model
