import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { ArrowBack, DeleteForever, Edit } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { TeacherSubject } from "../../models/TeacherSubject";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const TeacherSubjectDetails = () => {
	const {user, authenticated} = useUser()
	const {teacherSubjectId } = useParams();
	const [teacherSubject, setTeacherSubject] = useState<TeacherSubject>({
        "id": 0,
        "teacher": {
            "id": 0,
            "firstName": "",
            "lastName": "",
            "age": 0,
            "salary":0,
            "levelOfEducation": ""
        },
        "subject":{
            "id": 0,
            "name": "",
        },
        "teachingDegree": "",
        "yearsOfExperience": 0,
		"user": {
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
		}
        });

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_ADDR}/teacher-subjects/${teacherSubjectId}`,
			{
				headers: {
				  Authorization: `Bearer ${getTokenFromLocalStorage()}`
				}
			  });
			const course = await response.json();
			setTeacherSubject(course);
		};
		fetchCourse();
	}, [teacherSubjectId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teacher-subjects`}>
						<ArrowBack />
					</IconButton>{" "}
					<h1>teacher-subject Details</h1>
					<p>teacher-subject teacher name: {teacherSubject?.teacher.firstName + teacherSubject?.teacher.lastName}</p>
					<p>teacher-subject subject name: {teacherSubject?.subject.name}</p>
					<p>teacher-subject teaching degree: {teacherSubject.teachingDegree}</p>
					<p>teacher-subject years of experience: {teacherSubject.yearsOfExperience}</p>

				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teacher-subjects/${teacherSubjectId}/edit`}>
						<Edit />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/teacher-subjects/${teacherSubjectId}/delete`}>
						<DeleteForever sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};