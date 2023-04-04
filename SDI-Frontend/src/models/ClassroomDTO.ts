import { Student } from "./Student";

export interface ClassroomDTO{
    id: number;
    name: string;
    location: string;
    capacity: number;
    allocatedFunds: number;
    homeroomTeacher: string;
    students: Student[]; 
}