#!/bin/bash

sleep 5
QUIZ_ID=$(curl --data-binary @/srv/assets/quiz.json -H 'content-type: application/json' 127.0.0.1:3000/quiz)
cat > /srv/server/static/core/configuration.js << EOF
exports.configuration = {
    backendUrl: 'http://localhost:3000',
    quizId: '$QUIZ_ID',
    quizTime: '60'
};
EOF
