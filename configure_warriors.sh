#!/bin/bash

sleep 5
QUIZ_ID=$(curl --data-binary @/srv/assets/quiz.json -H 'content-type: application/json' 127.0.0.1:3000/quiz)
sed -i "s/configuration={backendUrl:\"https:\/\/warriors.mybluemix.net\",quizId:\"1267b4bf-2669-4b48-a1a3-8838d2be50b0\",quizTime:\"60\"}/configuration={backendUrl:\"\",quizId:\"$QUIZ_ID\",quizTime:\"60\"}/" /srv/server/static/index.html.bundle-1-0.js
