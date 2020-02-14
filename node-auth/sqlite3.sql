-- SQLite
DROP TABLE USER_ACCOUNT;
CREATE TABLE USER_ACCOUNT
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR
(50),
    password VARCHAR
(1000),
    active BIT DEFAULT
(1)
);
INSERT INTO USER_ACCOUNT
    (username, password)
VALUES
    ('admin', 'admin');
SELECT *
FROM USER_ACCOUNT
WHERE id = last_insert_rowid();