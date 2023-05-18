import { UserDTO } from "./UserDTO";

export interface SubjectShowAllDTO{
    id: number;
    name: string;
    averageYearsOfExperience: number;
    user: UserDTO;
}