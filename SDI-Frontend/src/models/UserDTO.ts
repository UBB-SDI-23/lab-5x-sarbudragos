export interface UserDTO{
    id: number;
    username: String;
    userProfile: {
        id: number;
        bio: String;
        location: String;
        birthDay: Date;
        gender: String;
        maritalStatus: String;
    };
    itemsPerPage: number;
    role: string;
    numberOfClassrooms: number,
    numberOfStudents: number,
    numberOfSubjects: number,
    numberOfTeacherSubjects: number,
    numberOfTeachers: number
}