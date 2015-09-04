#!/usr/bin/env bash
IMAGE_NAME=$1

rm model
cp -r ../model .
cf push warriors
rm -rf model
ln -s ../model
