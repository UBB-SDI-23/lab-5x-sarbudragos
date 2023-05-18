import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { ArrowBack, DeleteForever, Edit } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { Teacher } from "../../models/Teacher";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const TeacherDetails = () => {
	const {user, authenticated} = useUser()
	const {teacherId } = useParams();
	const [teacher, setTeacher] = useState<Teacher>({
        "id": 0,
        "firstName": "",
        "lastName": "",
        "age": 0,
        "salary": 0,
        "levelOfEducation": ""
      });

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_ADDR}/teachers/${teacherId}`,
			{
				headers: {
				  Authorization: `Bearer ${getTokenFromLocalStorage()}`
				}
			  });
			const course = await response.json();
			setTeacher(course);
		};
		fetchCourse();
	}, [teacherId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teachers`}>
						<ArrowBack />
					</IconButton>{" "}
					<h1>teacher Details</h1>
					<p>teacher Name: {teacher?.firstName}</p>
					<p>teacher Location: {teacher?.lastName}</p>
					<p>teacher Capacity: {teacher?.age}</p>
					<p>teacher Homeroom Teacher: {teacher.salary}</p>
					<p>teacher Allocated funds: {teacher.levelOfEducation}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/${teacherId}/edit`}>
						<Edit />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/${teacherId}/delete`}>
						<DeleteForever sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};