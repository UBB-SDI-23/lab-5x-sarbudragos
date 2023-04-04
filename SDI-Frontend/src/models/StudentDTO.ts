import { Classroom } from "./Classroom";

export interface StudentDTO{
    id: number;
    firstName: string;
    lastName: string;
    schoolYear: number;
    averageGrade: number;
    classroom: Classroom;
}