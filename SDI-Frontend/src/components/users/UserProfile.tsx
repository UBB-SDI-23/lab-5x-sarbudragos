import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Container, IconButton, TextField, Typography } from "@mui/material";
import { ArrowBack, DeleteForever, Edit } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";
import { UserDTO } from "../../models/UserDTO";
import axios from "axios";

export const UserProfile = () => {
	const {user, authenticated} = useUser()
	const {userId } = useParams();
	const [userProfile, setUserProfile] = useState<UserDTO>({
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
        "itemsPerPage": 0,
        "role": "",
        "numberOfClassrooms":0,
        "numberOfStudents":0,
        "numberOfSubjects":0,
        "numberOfTeacherSubjects":0,
        "numberOfTeachers":0
    });

    

	useEffect(() => {
		const fetchCourse = async () => {
			
			const response = await fetch(`${BACKEND_ADDR}/user/${userId}`,
			{
				headers:
				{
					Authorization: `Bearer ${getTokenFromLocalStorage()}`
				}
			  });
			const user = await response.json();
			setUserProfile(user);
		};
		fetchCourse();
	}, [userId]);

    const editItemsPerPage = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
            
			await axios.put(`${BACKEND_ADDR}/user/${userId}/itemsPerPage?newItemsPerPage=${userProfile.itemsPerPage}`, null,
			{
				headers: {
				  Authorization: `Bearer ${getTokenFromLocalStorage()}`
				}
			  });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/users`}>
						<ArrowBack />
					</IconButton>{" "}
					<h1>user Details</h1>
					<p>user Name: {userProfile.username}</p>
					<p>user Bio: {userProfile.userProfile.bio}</p>
					<p>user location: {userProfile.userProfile.location}</p>
					<p>user BirthDay: {String(userProfile.userProfile.birthDay)}</p>
					<p>user Gender: {userProfile.userProfile.gender}</p>
                    <p>user Marital status: {userProfile.userProfile.maritalStatus}</p>
                    <p>user numberOfClassrooms: {userProfile.numberOfClassrooms}</p>
                    <p>user numberOfStudents: {userProfile.numberOfStudents}</p>
                    <p>user numberOfTeachers: {userProfile.numberOfTeachers}</p>
                    <p>user numberOfSubjects: {userProfile.numberOfSubjects}</p>
                    <p>user numberOfTeacherSubjects: {userProfile.numberOfTeacherSubjects}</p>
                    {
                        userProfile.id == user.id &&
                        <form onSubmit={editItemsPerPage}>
                    <TextField
							id="itemsPerPage"
							label="Items per page"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setUserProfile({ ...userProfile, itemsPerPage: Number(event.target.value) })}
						/>
						

						<Button type="submit">Edit Items Per Page</Button>
					</form>
                    }
				</CardContent>
				<CardActions>
				</CardActions>
			</Card>

		</Container>
	);
};