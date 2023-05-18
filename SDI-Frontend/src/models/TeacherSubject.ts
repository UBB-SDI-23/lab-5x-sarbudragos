import { Subject } from "./Subject";
import { Teacher } from "./Teacher";
import { UserDTO } from "./UserDTO";

export interface TeacherSubject{
    id: number;
    teacher: Teacher;
    subject: Subject;
    yearsOfExperience: number;
    teachingDegree: string;
    user:UserDTO;
}