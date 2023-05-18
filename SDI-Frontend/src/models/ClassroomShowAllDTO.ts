import { UserDTO } from "./UserDTO";

export interface ClassroomShowAllDTO{
    user: UserDTO;
    id: number;
    name: string;
    location: string;
    capacity: number;
    allocatedFunds: number;
    homeroomTeacher: string;
    studentsAverageGrade: number;
}