import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClassroomDTO } from "../../models/ClassroomDTO";
import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { ArrowBack, DeleteForever, Edit } from "@mui/icons-material";

export const ClassroomDetails = () => {
	const {classroomId } = useParams();
	const [classroom, setClassroom] = useState<ClassroomDTO>({
		"id": 0,
        "name": "",
        "location": "",
        "capacity": 0,
        "homeroomTeacher": "",
        "allocatedFunds": 0,
        "students": [ ]
	});

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`http://35.233.23.137/classrooms/${classroomId}`);
			const course = await response.json();
			setClassroom(course);
		};
		fetchCourse();
	}, [classroomId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/classrooms`}>
						<ArrowBack />
					</IconButton>{" "}
					<h1>Classroom Details</h1>
					<p>Classroom Name: {classroom?.name}</p>
					<p>Classroom Location: {classroom.location}</p>
					<p>Classroom Capacity: {classroom.capacity}</p>
					<p>Classroom Homeroom Teacher: {classroom.homeroomTeacher}</p>
					<p>Classroom Allocated funds: {classroom.allocatedFunds}</p>
					<p>Course students:</p>
					<ul>
						{classroom.students.map((student) => (
							<li key={student.id}>{student.firstName + " " + student.lastName}</li>
						))}
					</ul>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/classrooms/${classroomId}/edit`}>
						<Edit />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/classrooms/${classroomId}/delete`}>
						<DeleteForever sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};