import { Container, Card, CardContent, IconButton, TextField, Button, CardActions, Alert } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Classroom } from "../../models/Classroom";
import { ClassroomDTO } from "../../models/ClassroomDTO";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const ClassroomAdd = () => {
	const {user, authenticated} = useUser()

	const [classroom, setClassroom] = useState<ClassroomDTO>({
        "id": 0,
        "name": "",
        "location": "",
        "capacity": 0,
        "homeroomTeacher": "",
        "allocatedFunds": 0,
        "students": [

        ]
      });

    const[operationState, setOperationState] = useState<String>("none");

	const addClassroom = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			if(classroom.capacity < 0){
                setOperationState("error");
                return;
            }
			await axios.post(`${BACKEND_ADDR}/classrooms`, classroom,
			{
				headers:
				{
					Authorization: `Bearer ${getTokenFromLocalStorage()}`
				}
			  }
			);
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
					<form onSubmit={addClassroom}>
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

						<Button type="submit">Add classroom</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};