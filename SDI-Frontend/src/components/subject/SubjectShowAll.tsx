import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Classroom } from "../../models/Classroom";
import { BACKEND_ADDR } from "../../backendAddress";
import { SubjectShowAllDTO } from "../../models/SubjectShowAllDTO";
import { Add, DeleteForever, Edit, ReadMore } from "@mui/icons-material";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const SubjectShowAll = () => {
  const {user, authenticated} = useUser()
    const [subjects, setsubjects] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      fetch(`${BACKEND_ADDR}/subjects?pageNumber=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      .then((response) => response.json())
      .then(
        (data) => {
          setsubjects(data.content);
          setLoading(false)
        }
      );
    }, [pageNumber]);
    
    
    return (
      <Container>
        {loading && <CircularProgress />}
        {!loading && subjects.length === 0 && <div>No subjects.</div>}
        {(
				<IconButton component={Link} sx={{ mr: 3 }} to={`/subjects/add`}>
					<Tooltip title="Add a new subject" arrow>
						<Add color="primary" />
					</Tooltip>
				</IconButton>
			)}
       {!loading && subjects.length > 0 &&
         <div className="App">
         <h1>All subjects</h1>
         <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
                <TableCell align="right">Average years of experience</TableCell>
                <TableCell align="right">User</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
           {subjects.map((subject: SubjectShowAllDTO, index) => (
            <TableRow key={subject.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{subject.name}</TableCell>
              <TableCell align="right">{subject.averageYearsOfExperience}</TableCell>
              <TableCell scope="row">
                <Link title="View user details" to={`/user/${subject.user.id}`}>
                  {subject.user.username}
                </Link>
              </TableCell>
              <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/subjects/${subject.id}/details`}>
											<Tooltip title="View subject details" arrow>
												<ReadMore color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/subjects/${subject.id}/edit`}>
											<Edit />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/subjects/${subject.id}/delete`}>
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
       {subjects.length <= 10 && 
        <Button onClick={() => {setPageNumber(pageNumber + 1)}}>
          Next
        </Button>
       }
      </Container>
        
    )
  }