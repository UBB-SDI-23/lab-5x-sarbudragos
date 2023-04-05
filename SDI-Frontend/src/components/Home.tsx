import { Container, CssBaseline, Typography } from "@mui/material"
import React from "react"

export const Home = () => {
    return(
        <React.Fragment>
			<CssBaseline />

			<Container maxWidth="xl">
				<Typography variant="h1" component="h1" gutterBottom>
					Welcome to the app! Use the menu above to navigate. This has been changed.
				</Typography>
			</Container>
		</React.Fragment>
    );
}