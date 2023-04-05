import { Link, useNavigate, useParams } from "react-router-dom";
import { ClassroomDTO } from "../../models/ClassroomDTO";
import { useState } from "react";
import axios from "axios";
import { Alert, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export const ClassroomEdit = () => {
    const { classroomId } = useParams();
	const navigate = useNavigate();

    const[operationState, setOperationState] = useState<String>("none");

	const [classroom, setClassroom] = useState<ClassroomDTO>({
        "id": Number(classroomId),
        "name": "",
        "location": "",
        "capacity": 0,
        "homeroomTeacher": "",
        "allocatedFunds": 0,
        "students": [

        ]
      });

	const editClassroom = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.put(`http://35.233.23.137/classrooms/${classroomId}`, classroom);
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
	};

	return (
		<Container>
            {operationState === "success" && 
                <Alert severity="success">Classroom added successfully!</Alert>
            }
            {operationState === "error" && 
                <Alert severity="error">An error has occured!</Alert>
            }
			<Card>
				<CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/classrooms`}>
						<ArrowBack />
					</IconButton>{" "}
					<form onSubmit={editClassroom}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClassroom({ ...classroom, name: event.target.value })}
						/>
						<TextField
							id="location"
							label="Location"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClassroom({ ...classroom, location: event.target.value })}
						/>
                        <TextField
							id="capacity"
							label="Capacity"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClassroom({ ...classroom, capacity: Number(event.target.value) })}
						/>
                        <TextField
							id="allocatedFunds"
							label="Allocated funds"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClassroom({ ...classroom, allocatedFunds: Number(event.target.value) })}
						/>
                        <TextField
							id="homeroomTeacher"
							label="Homeroom teacher"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClassroom({ ...classroom, homeroomTeacher: event.target.value })}
						/>

						<Button type="submit">Edit classroom</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};