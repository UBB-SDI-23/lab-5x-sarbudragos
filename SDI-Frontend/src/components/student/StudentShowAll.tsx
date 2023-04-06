import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Student } from "../../models/Student";
import {TextField} from "@mui/material";

export const StudentShowAll = () => {
    const [students, setStudents] = useState([])
    const [searched, setSearched] = useState<number>(0);

    const handleTextFieldChange = (event: { target: { value: string; }; }) => {
      setSearched(+event.target.value)
    }

    useEffect(() => {
      fetch(`http://35.233.23.137/students/grade-filter?grade=${searched}`)
      .then((response) => response.json())
      .then(
        (data) => setStudents(data)
      );
    }, [handleTextFieldChange]);

    
    return (
      <Container>
        {students.length === 0 && <div>No students.</div>}
       {students.length > 0 &&
         <div className="App">
         <h1>All students</h1>
         <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleTextFieldChange}/>
         <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">First name</TableCell>
								<TableCell align="right">Last name</TableCell>
								<TableCell align="right">School year</TableCell>
                <TableCell align="right">Average grade</TableCell>
                <TableCell align="right">Specialization</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
           {students.map((student: Student, index) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                <Link title="View course details" to={""}>
                  {student.firstName}
                </Link>
              </TableCell>
              <TableCell align="right">{student.lastName}</TableCell>
              <TableCell align="right">{student.schoolYear}</TableCell>
              <TableCell align="right">{student.averageGrade}</TableCell>
              <TableCell align="right">{student.specialization}</TableCell>
             </TableRow>
           ))}
           </Table>
         </TableContainer>
       </div>
       }
      </Container>
        
    )
  }