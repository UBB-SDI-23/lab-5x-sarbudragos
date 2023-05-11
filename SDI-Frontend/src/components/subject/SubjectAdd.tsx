import { Container, Card, CardContent, IconButton, TextField, Button, CardActions, Alert, Autocomplete} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { Classroom } from "../../models/Classroom";
import { debounce } from "lodash";
import { SubjectShowAllDTO } from "../../models/SubjectShowAllDTO";

export const SubjectAdd = () => {

	const [subject, setsubject] = useState<SubjectShowAllDTO>({
        "id": 0,
        "name": "",
        "averageYearsOfExperience": 0
        
      });

    const[operationState, setOperationState] = useState<String>("none");

	const addsubject = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
            
			await axios.post(`${BACKEND_ADDR}/subjects`, subject);
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
                <Alert severity="success">subject added successfully!</Alert>
            }
            {operationState === "error" && 
                <Alert severity="error">An error has occured!</Alert>
            }
			<Card>
				<CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/subjects`}>
						<ArrowBack />
					</IconButton>{" "}
					<form onSubmit={addsubject}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setsubject({ ...subject, name: event.target.value })}
						/>
                        <TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setsubject({ ...subject, averageYearsOfExperience: Number(event.target.value) })}
						/>
						

						<Button type="submit">Add subject</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};