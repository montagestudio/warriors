#!/usr/bin/env bash
npm install mop
cd node_modules/mop
npm install uglify-js@2.5.x
cd -
./node_modules/mop/optimize.js
