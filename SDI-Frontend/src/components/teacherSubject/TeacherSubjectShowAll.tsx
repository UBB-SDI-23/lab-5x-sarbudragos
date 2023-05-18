import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Classroom } from "../../models/Classroom";
import { Teacher } from "../../models/Teacher";
import { BACKEND_ADDR } from "../../backendAddress";
import { Add, DeleteForever, Edit, ReadMore } from "@mui/icons-material";
import { TeacherSubject } from "../../models/TeacherSubject";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const TeacherSubjectShowAll = () => {
  const {user, authenticated} = useUser()
    const [teacherSubjects, setteacherSubjects] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      fetch(`${BACKEND_ADDR}/teacher-subjects?pageNumber=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      .then((response) => response.json())
      .then(
        (data) => {
          setteacherSubjects(data.content);
          setLoading(false)
        }
      );
    }, [pageNumber]);
    
    
    return (
      <Container>
        {loading && <CircularProgress />}
        {!loading && teacherSubjects.length === 0 && <div>No teacherSubjects.</div>}
        {(
				<IconButton component={Link} sx={{ mr: 3 }} to={`/teacher-subjects/add`}>
					<Tooltip title="Add a new teacherSubject" arrow>
						<Add color="primary" />
					</Tooltip>
				</IconButton>
			)}
       {!loading && teacherSubjects.length > 0 &&
         <div className="App">
         <h1>All teacherSubjects</h1>
         <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Teacher Name</TableCell>
								<TableCell align="right">Subject Name</TableCell>
								<TableCell align="right">Teaching degree</TableCell>
                                <TableCell align="right">Years of experience</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
           {teacherSubjects.map((teacherSubject: TeacherSubject, index) => (
            <TableRow key={teacherSubject.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{teacherSubject.teacher.firstName + teacherSubject.teacher.firstName}</TableCell>
              <TableCell align="right">{teacherSubject.subject.name}</TableCell>
              <TableCell align="right">{teacherSubject.teachingDegree}</TableCell>
              <TableCell align="right">{teacherSubject.yearsOfExperience}</TableCell>
              <TableCell scope="row">
                <Link title="View user details" to={`/user/${teacherSubject.user.id}`}>
                  {teacherSubject.user.username}
                </Link>
              </TableCell>
              <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/teacher-subjects/${teacherSubject.id}/details`}>
											<Tooltip title="View teacher details" arrow>
												<ReadMore color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/teacher-subjects/${teacherSubject.id}/edit`}>
											<Edit />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/teacher-subjects/${teacherSubject.id}/delete`}>
											<DeleteForever sx={{ color: "red" }} />
										</IconButton>
							</TableCell>
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
       {teacherSubjects.length <= 10 && 
        <Button onClick={() => {setPageNumber(pageNumber + 1)}}>
          Next
        </Button>
       }
      </Container>
        
    )
  }