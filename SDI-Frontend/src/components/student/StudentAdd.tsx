import { Container, Card, CardContent, IconButton, TextField, Button, CardActions, Alert, Autocomplete} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { StudentDTO } from "../../models/StudentDTO";
import { Classroom } from "../../models/Classroom";
import { debounce } from "lodash";

export const StudentAdd = () => {

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

    const[operationState, setOperationState] = useState<String>("none");

	const addStudent = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			if(student.averageGrade < 0 || student.schoolYear < 0){
                setOperationState("error");
                return;
            }
			await axios.post(`${BACKEND_ADDR}/students`, student);
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
	};

    const [classrooms, setClassrooms] = useState<Classroom[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<{content: Classroom[]}>(
				`${BACKEND_ADDR}/classrooms/autocomplete?query=${query}`
			);
			const data = await response.data.content;

			setClassrooms(data);
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

    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

	return (
		<Container>
            {operationState === "success" && 
                <Alert severity="success">Student added successfully!</Alert>
            }
            {operationState === "error" && 
                <Alert severity="error">An error has occured!</Alert>
            }
			<Card>
				<CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/students`}>
						<ArrowBack />
					</IconButton>{" "}
					<form onSubmit={addStudent}>
						<TextField
							id="firstName"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, firstName: event.target.value })}
						/>
						<TextField
							id="lastName"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, lastName: event.target.value })}
						/>
                        <TextField
							id="schoolYear"
							label="School Year"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, schoolYear: Number(event.target.value) })}
						/>
                        <TextField
							id="address"
							label="Address"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, address: event.target.value })}
						/>
                        <TextField
							id="averageGrade"
							label="Average grade"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, averageGrade: Number(event.target.value) })}
						/>
                        <Autocomplete
							data-testid="test-classroom-input"
							id="classroom"
							options={classrooms}
							getOptionLabel={(option) => `${option.name}`}
							renderInput={(params) => <TextField {...params} label="Classroom" variant="outlined" />}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setStudent({ ...student, classroom: value});
								}
							}}
						/>

						<Button type="submit">Add student</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};