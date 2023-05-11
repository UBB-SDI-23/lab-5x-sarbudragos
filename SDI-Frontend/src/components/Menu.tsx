import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";


export const Menu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Classroom management
					</Typography>
					<Button
						variant={path.startsWith("/classrooms") ? "outlined" : "text"}
						to="/classrooms"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}>
						Classrooms
					</Button>
					<Button
						variant={path.startsWith("/students") ? "outlined" : "text"}
						to="/students"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}>
						Students
					</Button>
                    <Button
						variant={path.startsWith("/teachers") ? "outlined" : "text"}
						to="/teachers"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}>
						Teachers
					</Button>
					<Button
						variant={path.startsWith("/subjects") ? "outlined" : "text"}
						to="/subjects"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}>
						Subjects
					</Button>
					<Button
						variant={path.startsWith("/teacher-subjects") ? "outlined" : "text"}
						to="/teacher-subjects"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}>
						TeacherSubjects
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};