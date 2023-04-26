CREATE TABLE Classrooms
(
    id               INT AUTO_INCREMENT NOT NULL,
    name             VARCHAR(255) NULL,
    location         VARCHAR(255) NULL,
    capacity         INT NULL,
    HomeroomTeacher VARCHAR(255) NULL,
    allocatedFunds  DOUBLE NULL,
    CONSTRAINT pk_classrooms PRIMARY KEY (id)
);

CREATE TABLE Students
(
    id             INT AUTO_INCREMENT NOT NULL,
    firstName     VARCHAR(255) NULL,
    lastName      VARCHAR(255) NULL,
    schoolYear    INT NULL,
    averageGrade  DOUBLE NULL,
    specialization VARCHAR(255) NULL,
    classroom_id   INT NULL,
    CONSTRAINT pk_students PRIMARY KEY (id)
);

CREATE TABLE Subjects
(
    id   INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NULL,
    CONSTRAINT pk_subjects PRIMARY KEY (id)
);

CREATE TABLE TeacherSubject
(
    id                  INT AUTO_INCREMENT NOT NULL,
    teacher_id          INT NULL,
    subject_id          INT NULL,
    yearsOfExperience INT NULL,
    teachingDegree     VARCHAR(255) NULL,
    CONSTRAINT pk_teachersubject PRIMARY KEY (id)
);

CREATE TABLE Teachers
(
    id                 INT AUTO_INCREMENT NOT NULL,
    firstName         VARCHAR(255) NULL,
    lastName          VARCHAR(255) NULL,
    age                INT NULL,
    salary             DOUBLE NULL,
    levelOfEducation VARCHAR(255) NULL,
    CONSTRAINT pk_teachers PRIMARY KEY (id)
);

ALTER TABLE Students
    ADD CONSTRAINT FK_STUDENTS_ON_CLASSROOM FOREIGN KEY (classroom_id) REFERENCES Classrooms (id);

ALTER TABLE TeacherSubject
    ADD CONSTRAINT FK_TEACHERSUBJECT_ON_SUBJECT FOREIGN KEY (subject_id) REFERENCES Subjects (id);

ALTER TABLE TeacherSubject
    ADD CONSTRAINT FK_TEACHERSUBJECT_ON_TEACHER FOREIGN KEY (teacher_id) REFERENCES Teachers (id);