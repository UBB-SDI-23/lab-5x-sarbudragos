import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "./common";
import { UserDTO } from "../models/UserDTO";

export function useUser() {
    const [user, setUser] = useState<UserDTO>({
      "id": 0,
        "username": "",
        "userProfile": {
            "id": 0,
            "bio": "",
            "location": "",
            "birthDay": new Date(),
            "gender": "",
            "maritalStatus": "",
         },
        "itemsPerPage": 10,
        "role": "",
        "numberOfClassrooms":0,
        "numberOfStudents":0,
        "numberOfSubjects":0,
        "numberOfTeacherSubjects":0,
        "numberOfTeachers":0
  });
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function getUserDetails() {
        const { authenticated, user } = await getAuthenticatedUser();
        console.log(authenticated)
        if (!authenticated) {
          
          navigate("/login");
          return;
        }
        setUser(user);
        setAuthenticated(authenticated);
      }
      getUserDetails();
    }, []);
  
    return { user, authenticated };
  }