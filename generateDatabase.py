from time import time

from faker import Faker

N = 1000


def main():
    fake = Faker()

    sql = ""

    for i in range(0, N):
        sql += "INSERT INTO school.Teachers (age, firstName, lastName, levelOfEducation, salary) VALUES "

        # generate fake data
        for j in range(0, N):
            age = fake.random_int(min=18, max=65)
            firstName = fake.first_name()
            lastName = fake.last_name()
            levelOfEducation = fake.random_element(elements=('Baccalaureate', 'Bachelors', 'Masters', 'PhD'))
            salary = fake.random_int(min=2000, max=7000)

            # create INSERT SQL statement
            sql += "({}, '{}', '{}', '{}', {}), ".format(age, firstName, lastName, levelOfEducation, salary)

        sql = sql[:len(sql) - 2]
        sql += ";\n"

        print("Teachers: " + str(i))

    for i in range(0, N):
        sql += "INSERT INTO school.Subjects (name) VALUES "

        # generate fake data
        for j in range(0, N):
            name = fake.text(max_nb_chars=20)

            # create INSERT SQL statement
            sql += "('{}'), ".format(name)

        sql = sql[:len(sql) - 2]
        sql += ";\n"

        print("Subjects: " + str(i))

    for i in range(0, N):
        sql += "INSERT INTO school.TeacherSubject (subject_id, teacher_id, teachingDegree, yearsOfExperience) VALUES "

        # generate fake data
        for j in range(0, N):
            for k in range(0, 10):
                subjectId = (i + 1) * (j + 1)
                teacherId = subjectId + k if subjectId + k > N * N else k + 1

                teachingDegree = fake.random_int(min=1, max=2)
                yearsOfExperience = fake.random_int(min=0, max=50)

                # create INSERT SQL statement
                sql += "({}, {}, '{}', {}), ".format(subjectId, teacherId, teachingDegree, yearsOfExperience)

        sql = sql[:len(sql) - 2]
        sql += ";\n"

        print("TeacherSubjects: " + str(i))

    for i in range(0, N):
        sql += "INSERT INTO school.Classrooms (HomeroomTeacher, allocatedFunds, capacity, location, name) VALUES "

        # generate fake data
        for j in range(0, N):
            homeroomTeacher = fake.name()
            allocatedFunds = fake.random_int(min=1000, max=10000)
            capacity = fake.random_int(min=1000, max=10000)
            location = fake.text(max_nb_chars=50)
            name = str(fake.random_int(min=1, max=12)) + \
                fake.lexify(text='Random Identifier: ?', letters='ABCDEFGHIJKLMNOPQR')[-1]

            # create INSERT SQL statement
            sql += "('{}', {}, {}, '{}', '{}'), ".format(homeroomTeacher, allocatedFunds, capacity, location, name)

        sql = sql[:len(sql) - 2]
        sql += ";\n"

        print("Classrooms: " + str(i))

    for i in range(0, N):
        sql += "INSERT INTO school.Students (averageGrade, firstName, lastName, schoolYear, specialization, classroom_id) VALUES "

        # generate fake data
        for j in range(0, N):
            averageGrade = fake.random_int(min=10, max=100) / 10
            firstName = fake.first_name()
            lastName = fake.last_name()
            schoolYear = fake.random_int(min=1, max=12)
            specialization = fake.random_element(
                elements=('MI', 'SN', 'Mecanica', 'SS', 'Filo', 'Pedagogic', 'Sportiv'))
            classroomId = fake.random_int(min=1, max=N)

            # create INSERT SQL statement
            sql += "({}, '{}', '{}', {}, '{}', {}), ".format(averageGrade, firstName, lastName, schoolYear,
                                                             specialization, classroomId)

        sql = sql[:len(sql) - 2]
        sql += ";\n"

        print("Students: " + str(i))

    # write SQL statement to file
    with open('insert.sql', 'w') as f:
        f.write(sql)


if __name__ == '__main__':
    t = time()
    main()
    print(time() - t)
