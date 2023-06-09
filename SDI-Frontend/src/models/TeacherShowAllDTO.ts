import { UserDTO } from "./UserDTO";

export interface TeacherShowAllDTO{
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    salary: number;
    levelOfEducation: string;
    highestYearsOfExperience: number;
    user: UserDTO;
}