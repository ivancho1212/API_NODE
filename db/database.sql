CREATE DATABASE IF NOT EXISTS project_db;

USE project_db;

CREATE TABLE document_type (
    documentTypedId INT(11) AUTO_INCREMENT PRIMARY KEY,
    documentTypedName VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE person (
    personID INT(11) AUTO_INCREMENT PRIMARY KEY,
    personName VARCHAR(20) NOT NULL,
    personLast_name VARCHAR(20) NOT NULL,
    personNumber VARCHAR(10) NOT NULL,
    documentTypedFk INT(11) NOT NULL,
    FOREIGN KEY (documentTypedFk) REFERENCES document_type(documentTypedId)
);

CREATE TABLE user_status (
    statusId INT(11) AUTO_INCREMENT PRIMARY KEY,
    statusName VARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE person ADD COLUMN statusFk INT(11);

INSERT INTO user_status (statusName) VALUES ('Active'), ('Inactive');

UPDATE person SET statusFk = (SELECT statusId FROM user_status WHERE statusName = 'Active');

ALTER TABLE person MODIFY COLUMN statusFk INT(11) NOT NULL;

ALTER TABLE person ADD CONSTRAINT person_ibfk_2 FOREIGN KEY (statusFk) REFERENCES user_status(statusId);

ALTER TABLE person MODIFY COLUMN statusFk INT(11) NOT NULL DEFAULT 1;
