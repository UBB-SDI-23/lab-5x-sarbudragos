import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Classroom } from "../../models/Classroom";
import { Teacher } from "../../models/Teacher";

export const TeacherShowAll = () => {
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
      fetch("http://35.233.23.137/teachers?pageNumber=0&pageSize=5")
      .then((response) => response.json())
      .then(
        (data) => setTeachers(data)
      );
    }, []);
    
    
    return (
      <Container>
        {teachers.length === 0 && <div>No teachers.</div>}
       {teachers.length > 0 &&
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
              <TableCell component="th" scope="row">
              </TableCell>
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
      </Container>
        
    )
  }