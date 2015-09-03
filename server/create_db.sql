CREATE DATABASE warriors;
\c warriors
CREATE EXTENSION "uuid-ossp";
CREATE TABLE "quiz" (
    id          UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
    document    JSON    NOT NULL
);
CREATE TABLE "answer" (
    id          UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id     UUID    NOT NULL REFERENCES quiz (id),
    index       INTEGER NOT NULL,
    answer      INTEGER,
    correct     BOOLEAN NOT NULL
);
