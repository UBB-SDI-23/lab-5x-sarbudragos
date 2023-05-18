import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { ArrowBack, DeleteForever, Edit } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { StudentDTO } from "../../models/StudentDTO";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const SubjectDetails = () => {
	const {user, authenticated} = useUser()
	const {studentId } = useParams();
	const [student, setStudent] = useState<StudentDTO>({
        "id": 0,
        "firstName": "",
        "lastName": "",
        "schoolYear": 0,
        "address": "",
        "averageGrade": 0,
        "classroom": {
            "id": 0,
            "name": "",
            "location": "",
            "capacity": 0,
            "homeroomTeacher": "",
            "allocatedFunds": 0,
        }
    });

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_ADDR}/students/${studentId}`,
			{
				headers: {
				  Authorization: `Bearer ${getTokenFromLocalStorage()}`
				}
			  });
			const course = await response.json();
			setStudent(course);
		};
		fetchCourse();
	}, [studentId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/students`}>
						<ArrowBack />
					</IconButton>{" "}
					<h1>Student Details</h1>
					<p>Student Name: {student?.firstName}</p>
					<p>student Location: {student?.lastName}</p>
					<p>student Capacity: {student?.schoolYear}</p>
					<p>student Homeroom Teacher: {student.averageGrade}</p>
					<p>student Allocated funds: {student.address}</p>
					<p>Course students: {student.classroom.name}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/students/${studentId}/edit`}>
						<Edit />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/students/${studentId}/delete`}>
						<DeleteForever sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};