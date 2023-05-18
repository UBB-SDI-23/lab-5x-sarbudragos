import { useEffect, useState } from "react";
import { LogInInformation } from "../../models/LogInInformation";
import axios from "axios";
import { BACKEND_ADDR } from "../../backendAddress";
import { Container, Card, CardContent, TextField, Button, CardActions, Typography } from "@mui/material";
import { storeTokenInLocalStorage } from "../../lib/common";
import { Label } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const SignUpPage = () => {
    const [loginInformation , setLoginInformation] = useState<LogInInformation>({
        "userName": "",
        "password": ""
    });
    const[operationState, setOperationState] = useState<String>("none");
    const [activationCode, setActivationCode] = useState<Number>(0);

    const logIn = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
		try {
			const response = await axios.post(`${BACKEND_ADDR}/register`, loginInformation);
            setActivationCode(response.data)
			setOperationState("success");
		} catch (error) {
            setOperationState("error");
			console.log(error);
		}
    }; 

    useEffect(() => {
        
      }, [activationCode]);

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
						<Button type="submit">Sign up</Button>
					</form>
                    {
                        activationCode !=0 &&
                        <Container>
                            <Typography gutterBottom>
                                Activation code is ${String(activationCode)}
				            </Typography>
                            <Button component={Link} sx={{ mr: 3 }} to={`/register/confirm/${activationCode}`}>
                                Activate
                            </Button>
                        </Container>
                    }
				</CardContent>
				<CardActions></CardActions>
                
			</Card>
        </Container>
    )
}