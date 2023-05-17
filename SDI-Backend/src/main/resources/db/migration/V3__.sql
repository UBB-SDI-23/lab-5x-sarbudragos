CREATE TABLE UserProfiles
(
    id             INT AUTO_INCREMENT NOT NULL,
    bio            VARCHAR(255)       NULL,
    location       VARCHAR(255)       NULL,
    birthday       date               NULL,
    gender         VARCHAR(255)       NULL,
    maritalStatus VARCHAR(255)       NULL,
    CONSTRAINT pk_userprofiles PRIMARY KEY (id)
);

CREATE TABLE Users
(
    id              INT AUTO_INCREMENT NOT NULL,
    username        VARCHAR(255)       NULL,
    password        VARCHAR(255)       NULL,
    userProfile_id INT                NULL,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE Classrooms
    ADD user_id INT NULL;

ALTER TABLE Students
    ADD user_id INT NULL;

ALTER TABLE Teachers
    ADD user_id INT NULL;

ALTER TABLE Subjects
    ADD user_id INT NULL;

ALTER TABLE TeacherSubject
    ADD user_id INT NULL;

ALTER TABLE Classrooms
    ADD CONSTRAINT FK_CLASSROOMS_ON_USER FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Students
    ADD CONSTRAINT FK_STUDENTS_ON_USER FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Subjects
    ADD CONSTRAINT FK_SUBJECTS_ON_USER FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE TeacherSubject
    ADD CONSTRAINT FK_TEACHERSUBJECT_ON_USER FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Teachers
    ADD CONSTRAINT FK_TEACHERS_ON_USER FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Users
    ADD CONSTRAINT FK_USERS_ON_USERPROFILE FOREIGN KEY (userProfile_id) REFERENCES UserProfiles (id);