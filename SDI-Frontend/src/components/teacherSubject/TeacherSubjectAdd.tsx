import { Container, Card, CardContent, IconButton, TextField, Button, CardActions, Alert, Autocomplete} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";

import { Classroom } from "../../models/Classroom";
import { debounce } from "lodash";
import { TeacherSubject } from "../../models/TeacherSubject";
import { Teacher } from "../../models/Teacher";
import { Subject } from "../../models/Subject";

export const TeacherSubjectAdd = () => {

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
        "yearsOfExperience": 0
        });

    const[operationState, setOperationState] = useState<String>("none");

	const addteacherSubject = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_ADDR}/teacherSubjects`, teacherSubject);
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

    const debouncedFetchSubjectSuggestions = useCallback(debounce(fetchSubjectSuggestions, 500), []);


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

    const handleSubjectInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSubjectSuggestions(value);
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
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher-subjects`}>
						<ArrowBack />
					</IconButton>{" "}
					<form onSubmit={addteacherSubject}>
                    <Autocomplete
							data-testid="test-teacher-input"
							id="teacher"
							options={teachers}
							getOptionLabel={(option) => `${option.firstName + option.lastName}`}
							renderInput={(params) => <TextField {...params} label="Teacher" variant="outlined" />}
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
							onInputChange={handleSubjectInputChange}
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
							label="YearsOfExperience"
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