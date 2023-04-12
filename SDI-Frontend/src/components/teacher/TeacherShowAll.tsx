import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Classroom } from "../../models/Classroom";
import { Teacher } from "../../models/Teacher";
import { BACKEND_ADDR } from "../../backendAddress";

export const TeacherShowAll = () => {
    const [teachers, setTeachers] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      fetch(`${BACKEND_ADDR}/teachers?pageNumber=${pageNumber}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setTeachers(data.content);
          setLoading(false)
        }
      );
    }, [pageNumber]);
    
    
    return (
      <Container>
        {loading && <CircularProgress />}
        {!loading && teachers.length === 0 && <div>No teachers.</div>}
       {!loading && teachers.length > 0 &&
         <div className="App">
         <h1>All teachers</h1>
         <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">First Name</TableCell>
								<TableCell align="right">Last Name</TableCell>
								<TableCell align="right">Age</TableCell>
                <TableCell align="right">Salary</TableCell>
                <TableCell align="right">Level of education</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
           {teachers.map((teacher: Teacher, index) => (
            <TableRow key={teacher.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{teacher.firstName}</TableCell>
              <TableCell align="right">{teacher.lastName}</TableCell>
              <TableCell align="right">{teacher.age}</TableCell>
              <TableCell align="right">{teacher.salary}</TableCell>
              <TableCell align="right">{teacher.levelOfEducation}</TableCell>
             </TableRow>
           ))}
           </Table>
         </TableContainer>
       </div>
       }
       {pageNumber !== 0 &&
        <Button onClick={() => {setPageNumber(pageNumber - 1)}}>
          Previous
        </Button>
       }
       {teachers.length <= 10 && 
        <Button onClick={() => {setPageNumber(pageNumber + 1)}}>
          Next
        </Button>
       }
      </Container>
        
    )
  }