import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { Teacher } from "../../models/Teacher";

export const TeacherEdit = () => {
    const { teacherId } = useParams();
	const navigate = useNavigate();

    const[operationState, setOperationState] = useState<String>("none");

	const [teacher, setTeacher] = useState<Teacher>({
        "id": 0,
        "firstName": "",
        "lastName": "",
        "age": 0,
        "salary": 0,
        "levelOfEducation": ""
      });


	const editteacher = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
            if(teacher.age < 0 || teacher.salary < 0){
                setOperationState("error");
                return;
            }
			await axios.put(`${BACKEND_ADDR}/teachers/${teacherId}`, teacher);
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
	};

	return (
		<Container>
            {operationState === "success" && 
                <Alert severity="success">teacher updated successfully!</Alert>
            }
            {operationState === "error" && 
                <Alert severity="error">An error has occured!</Alert>
            }
			<Card>
				<CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers`}>
						<ArrowBack />
					</IconButton>{" "}
					<form onSubmit={editteacher}>
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
							id="address"
							label="Address"
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

						<Button type="submit">Edit teacher</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};