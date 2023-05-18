import { Button, Card, CardActions, CardContent, Container, TextField } from "@mui/material"
import axios from "axios";
import { BACKEND_ADDR } from "../../backendAddress";
import { LogInInformation } from "../../models/LogInInformation";
import { useState } from "react";
import { storeTokenInLocalStorage } from "../../lib/common";
import { Link } from "react-router-dom";

export const LogInPage = () => {
    const [loginInformation , setLoginInformation] = useState<LogInInformation>({
        "userName": "",
        "password": ""
    });
    const[operationState, setOperationState] = useState<String>("none");

    const logIn = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
		try {
			const response = await axios.post(`${BACKEND_ADDR}/login`, loginInformation);
            storeTokenInLocalStorage(response.data.token)
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
    }; 

    return (
        <Container>
            <Card>
				<CardContent>
					<form onSubmit={logIn}>
						<TextField
							id="userName"
							label="User Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setLoginInformation({ ...loginInformation, userName: event.target.value })}
						/>
						<TextField
							id="password"
							label="Password"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setLoginInformation({ ...loginInformation, password: event.target.value })}
						/>
						<Button type="submit">Login</Button>
					</form>
                    <Button component={Link} sx={{ mr: 3 }} to={`/register`}>Sign up</Button>
				</CardContent>
				<CardActions></CardActions>
                
			</Card>
        </Container>
    )
}