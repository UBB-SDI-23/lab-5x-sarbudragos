import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Alert, Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField, } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { TeacherSubject } from "../../models/TeacherSubject";
import { Teacher } from "../../models/Teacher";
import { Subject } from "../../models/Subject";
import { debounce } from "lodash";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const TeacherSubjectEdit = () => {
	const {user, authenticated} = useUser()
    const { teacherSubjectId } = useParams();
	const navigate = useNavigate();

    const[operationState, setOperationState] = useState<String>("none");

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

	const editTeacherSubject = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.put(`${BACKEND_ADDR}/teacher-subjects/${teacherSubjectId}`, teacherSubject,
			{
				headers: {
				  Authorization: `Bearer ${getTokenFromLocalStorage()}`
				}
			  });
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
	};

	const addteacherSubject = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_ADDR}/teacherSubjects`, teacherSubject,
			{
				headers: {
				  Authorization: `Bearer ${getTokenFromLocalStorage()}`
				}
			  });
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
	};

    const [teachers, setTeachers] = useState<Teacher[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<{content: Teacher[]}>(
				`${BACKEND_ADDR}/teachers/autocomplete?query=${query}`
			);
			const data = await response.data.content;

			setTeachers(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

    

    const [subjects, setSubjects] = useState<Subject[]>([]);

	const fetchSubjectSuggestions = async (query: string) => {
		try {
			const response = await axios.get<{content: Subject[]}>(
				`${BACKEND_ADDR}/subjects/autocomplete?query=${query}`
			);
			const data = await response.data.content;

			setSubjects(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};


	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

	return (
		<Container>
            {operationState === "success" && 
                <Alert severity="success">teacherSubject added successfully!</Alert>
            }
            {operationState === "error" && 
                <Alert severity="error">An error has occured!</Alert>
            }
			<Card>
				<CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teacherSubjects`}>
						<ArrowBack />
					</IconButton>{" "}
					<form onSubmit={addteacherSubject}>
                    <Autocomplete
							data-testid="test-teacher-input"
							id="teacher"
							options={teachers}
							getOptionLabel={(option) => `${option.firstName + option.lastName}`}
							renderInput={(params) => <TextField {...params} label="Classroom" variant="outlined" />}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setTeacherSubject({ ...teacherSubject, teacher: value});
								}
							}}
						/>
                        <Autocomplete
							data-testid="test-subject-input"
							id="subject"
							options={subjects}
							getOptionLabel={(option) => `${option.name}`}
							renderInput={(params) => <TextField {...params} label="Subject" variant="outlined" />}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setTeacherSubject({ ...teacherSubject, subject: value});
								}
							}}
						/>
						<TextField
							id="teachingDegree"
							label="Teaching Degree"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacherSubject({ ...teacherSubject, teachingDegree: event.target.value })}
						/>
						<TextField
							id="yearsOfExperience"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacherSubject({ ...teacherSubject, yearsOfExperience: Number(event.target.value) })}
						/>
                        

						<Button type="submit">Add teacherSubject</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};