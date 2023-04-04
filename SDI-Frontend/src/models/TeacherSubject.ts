import { Subject } from "./Subject";
import { Teacher } from "./Teacher";

export interface TeacherSubject{
    id: number;
    teacher: Teacher;
    subject: Subject;
    yearsOfExperience: number;
    teachingDegree: string;
}