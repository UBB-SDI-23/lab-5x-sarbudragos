import { Container, Card, CardContent, IconButton, TextField, Button, CardActions, Alert, Autocomplete} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";

import { Classroom } from "../../models/Classroom";
import { debounce } from "lodash";
import { Teacher } from "../../models/Teacher";

export const TeacherAdd = () => {

	const [teacher, setTeacher] = useState<Teacher>({
        "id": 0,
        "firstName": "",
        "lastName": "",
        "age": 0,
        "salary": 0,
        "levelOfEducation": ""
      });

    const[operationState, setOperationState] = useState<String>("none");

	const addteacher = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
            if(teacher.age < 0 || teacher.salary < 0){
                setOperationState("error");
                return;
            }
			await axios.post(`${BACKEND_ADDR}/teachers`, teacher);
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
	};

	return (
		<Container>
            {operationState === "success" && 
                <Alert severity="success">Teacher added successfully!</Alert>
            }
            {operationState === "error" && 
                <Alert severity="error">An error has occured!</Alert>
            }
			<Card>
				<CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers`}>
						<ArrowBack />
					</IconButton>{" "}
					<form onSubmit={addteacher}>
						<TextField
							id="firstName"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacher({ ...teacher, firstName: event.target.value })}
						/>
						<TextField
							id="lastName"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacher({ ...teacher, lastName: event.target.value })}
						/>
                        <TextField
							id="age"
							label="Age"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacher({ ...teacher, age: Number(event.target.value) })}
						/>
                        <TextField
							id="salary"
							label="Salary"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacher({ ...teacher, salary: Number(event.target.value) })}
						/>
                        <TextField
							id="levelOfEducation"
							label="Level Of Education"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacher({ ...teacher, levelOfEducation: event.target.value })}
						/>
                        

						<Button type="submit">Add teacher</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};