import { useEffect, useState } from "react"
import { Classroom } from "../../models/Classroom"
import Container from "@mui/material/Container/Container";
import { IconButton, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { Add, DeleteForever, Edit, ReadMore } from "@mui/icons-material";

export const ClassroomShowAll = () => {
    const [classrooms, setClassroom] = useState([])

    useEffect(() => {
      fetch("http://35.233.23.137/classrooms")
      .then((response) => response.json())
      .then(
        (data) => setClassroom(data)
      );
    }, []);
    
    
    return (
      <Container>
        {classrooms.length === 0 && <div>No classrooms.</div>}
        {(
				<IconButton component={Link} sx={{ mr: 3 }} to={`/classrooms/add`}>
					<Tooltip title="Add a new course" arrow>
						<Add color="primary" />
					</Tooltip>
				</IconButton>
			)}

       {classrooms.length > 0 &&
         <div className="App">
         <h1>All classrooms</h1>
         <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Location</TableCell>
								<TableCell align="right">Capacity</TableCell>
                <TableCell align="right">Allocated funds</TableCell>
                <TableCell align="right">Homeroom teacher</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
           {classrooms.map((classroom: Classroom, index) => (
            <TableRow key={classroom.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                <Link title="View classroom details" to={`/classrooms/${classroom.id}/details`}>
                  {classroom.name}
                </Link>
              </TableCell>
              <TableCell align="right">{classroom.location}</TableCell>
              <TableCell align="right">{classroom.capacity}</TableCell>
              <TableCell align="right">{classroom.allocatedFunds}</TableCell>
              <TableCell align="right">{classroom.homeroomTeacher}</TableCell>
              <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/classrooms/${classroom.id}/details`}>
											<Tooltip title="View course details" arrow>
												<ReadMore color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/classrooms/${classroom.id}/edit`}>
											<Edit />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/classrooms/${classroom.id}/delete`}>
											<DeleteForever sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
             </TableRow>
           ))}
           </Table>
         </TableContainer>
       </div>
       }
      </Container>
        
    )
  }