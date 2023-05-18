import { UserDTO } from "./UserDTO";

export interface SubjectExperienceDTO{
    id: number;
    name: string;
    experience: number;
    user: UserDTO;
}