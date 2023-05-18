import { Button, Card, CardActions, CardContent, Container, TextField } from "@mui/material"
import axios from "axios";
import { BACKEND_ADDR } from "../../backendAddress";
import { LogInInformation } from "../../models/LogInInformation";
import { useEffect, useState } from "react";
import { storeTokenInLocalStorage } from "../../lib/common";
import { Link, useParams } from "react-router-dom";

export const ActivationPage = () => {
    const { activationCode } = useParams();
    const[operationState, setOperationState] = useState<String>("none");


    useEffect(() => {
        const activate = async () => {
            try {
                const response = await axios.post(`${BACKEND_ADDR}/register/confirm/${activationCode}`);
                storeTokenInLocalStorage(response.data.token)
                setOperationState("success");
            } catch (error) {
                setOperationState("error");
                console.log(error);
            }
        }
        activate()
    }, [operationState]);

    return (
        <Container>
            ${operationState}
        </Container>
    )
}