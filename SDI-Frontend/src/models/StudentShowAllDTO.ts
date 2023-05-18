import { UserDTO } from "./UserDTO";

export interface StudentShowAllDTO{
    id: number;
    firstName: string;
    lastName: string;
    schoolYear: number;
    averageGrade: number;
    specialization: string;
    classroom: string;
    address: string;
    user: UserDTO;
}