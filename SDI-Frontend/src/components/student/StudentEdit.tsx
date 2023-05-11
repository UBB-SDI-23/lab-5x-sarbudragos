import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentDTO } from "../../models/StudentDTO";
import { useState } from "react";
import axios from "axios";
import { Alert, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";

export const StudentEdit = () => {
    const { studentId } = useParams();
	const navigate = useNavigate();

    const[operationState, setOperationState] = useState<String>("none");

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

	const editstudent = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.put(`${BACKEND_ADDR}/students/${studentId}`, student);
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
	};

	return (
		<Container>
            {operationState === "success" && 
                <Alert severity="success">student added successfully!</Alert>
            }
            {operationState === "error" && 
                <Alert severity="error">An error has occured!</Alert>
            }
			<Card>
				<CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/students`}>
						<ArrowBack />
					</IconButton>{" "}
					<form onSubmit={editstudent}>
						<TextField
							id="firstName"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, firstName: event.target.value })}
						/>
						<TextField
							id="lastName"
							label="Last Name"
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
							id="averageGrade"
							label="Average Grade"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, averageGrade: Number(event.target.value) })}
						/>
                        <TextField
							id="address"
							label="Address"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, address: event.target.value })}
						/>

						<Button type="submit">Edit student</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};