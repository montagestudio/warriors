-- Clean up old stuff
DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS run;
DROP TABLE IF EXISTS quiz;
DROP EXTENSION IF EXISTS "uuid-ossp";

-- Create brand new stuff
CREATE EXTENSION "uuid-ossp";

CREATE TABLE "quiz" (
    id              UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
    document        JSON    NOT NULL
);
CREATE INDEX "quiz_document_title" ON quiz (
    (document->>'title')
);

CREATE TABLE "run" (
    id              UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id         UUID    NOT NULL REFERENCES quiz (id),
    correct_count   INTEGER,
    wrong_count     INTEGER,
    duration        INTEGER,
    finished        BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX "run_quiz" ON run (
    quiz_id
);

CREATE TABLE "answer" (
    id              UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
    run_id          UUID    NOT NULL REFERENCES run (id),
    question        INTEGER NOT NULL,
    answer          INTEGER,
    correct         BOOLEAN NOT NULL
);
CREATE INDEX "answer_run_question" ON answer (
    run_id,
    question
);
