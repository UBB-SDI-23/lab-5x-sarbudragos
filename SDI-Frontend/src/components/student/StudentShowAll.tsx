import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Student } from "../../models/Student";
import {TextField} from "@mui/material";

export const StudentShowAll = () => {
    const [students, setStudents] = useState([])
    const [searched, setSearched] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const handleTextFieldChange = (event: { target: { value: string; }; }) => {
      setSearched(+event.target.value)
    }

    useEffect(() => {
      setLoading(true);
      fetch(`http://35.233.23.137/students/grade-filter?grade=${searched}&pageNumber=0&pageSize=5`)
      .then((response) => response.json())
      .then(
        (data) => {
          setStudents(data);
          setLoading(false);
        }
      );
    }, [searched]);

    
    return (
      <Container>
        <h1>All students</h1>
        {loading && <CircularProgress />}
        <TextField id="outlined-basic" label="Filter by minimum grade" variant="outlined" onChange={handleTextFieldChange}/>
        {!loading && students.length === 0 && <div>No students.</div>}
       {!loading && students.length > 0 &&
         <div className="App">
         
         
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