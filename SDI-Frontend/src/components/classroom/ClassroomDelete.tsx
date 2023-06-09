import { ArrowBack } from "@mui/icons-material";
import { Alert, Button, Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_ADDR } from "../../backendAddress";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const ClassroomDelete = () => {
	const {user, authenticated} = useUser()
	const { classroomId } = useParams();
	const navigate = useNavigate();

    const[operationState, setOperationState] = useState<String>("none");

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_ADDR}/classrooms/${classroomId}`,
		{
			headers:
			{
				Authorization: `Bearer ${getTokenFromLocalStorage()}`
			}
		  }
		);
        setOperationState("success");

	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		navigate("/classrooms");
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
					Are you sure you want to delete this classroom? This cannot be undone!
				</CardContent>
				<CardActions>
					<Button onClick={handleDelete}>Delete it</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>
	);
};