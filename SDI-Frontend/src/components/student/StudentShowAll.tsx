import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, CircularProgress, Button, IconButton, Tooltip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Student } from "../../models/Student";
import {TextField} from "@mui/material";
import { BACKEND_ADDR } from "../../backendAddress";
import { Add, DeleteForever, Edit, ReadMore } from "@mui/icons-material";
import { StudentShowAllDTO } from "../../models/StudentShowAllDTO";
import { useUser } from "../../lib/customHooks";
import { getTokenFromLocalStorage } from "../../lib/common";

export const StudentShowAll = () => {
    const [students, setStudents] = useState([])
    const [searched, setSearched] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [pageCount, setPageCount] = useState(0)
    const {user, authenticated} = useUser()

    const handleTextFieldChange = (event: { target: { value: string; }; }) => {
      setSearched(+event.target.value)
    }

    useEffect(() => {
      setLoading(true);
      fetch(`${BACKEND_ADDR}/students/grade-filter?grade=${searched}&pageNumber=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      .then((response) => response.json())
      .then(
        (data) => {
          setStudents(data);
          setLoading(false);
        }
      );
    }, [searched, pageNumber]);

    function handlePageSizeChange(event: SelectChangeEvent<number>, child: ReactNode): void {
      setPageSize(Number(event.target.value))
    }

    const visiblePageButtons = (pNumber: number, pCount: number) => {
      var result = Array<number>();
      if(pCount > 5){
        for(var i = 1; i <= 5; i++){
          result.push(i);
        }
        if(pNumber > 5){
          result.push(-1);
        }
        for(var i = pNumber - 5; i <= pNumber + 5; i++){
          console.log(i);
          if(i > 5 && i < pCount - 5){

            result.push(i);
          }
        }
        if(pNumber < pCount - 5){
          result.push(-1);
        }

        for(var i = pCount - 5; i <= pCount; i++){
          result.push(i);
        }
      }
      console.log(result);
      return result;
    }

    
    return (
      <Container>
        <h1>All students</h1>

        {loading && <CircularProgress />}
        <TextField id="outlined-basic" label="Filter by minimum grade" variant="outlined" onChange={handleTextFieldChange}/>
        {!loading && students.length === 0 && <div>No students.</div>}
        {(
				<IconButton component={Link} sx={{ mr: 3 }} to={`/students/add`}>
					<Tooltip title="Add a new student" arrow>
						<Add color="primary" />
					</Tooltip>
				</IconButton>
			)}
       {!loading && students.length > 0 &&
         <div className="App">
         <FormControl>
            <InputLabel id="demo-simple-select-label">Items per page</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              label="Items per page"
              onChange={handlePageSizeChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
</FormControl>
         
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
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Classroom</TableCell>
                <TableCell align="right">User</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
           {students.map((student: StudentShowAllDTO, index) => (
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
              <TableCell align="right">{student.address}</TableCell>
              <TableCell align="right">{student.classroom}</TableCell>
              <TableCell scope="row">
                <Link title="View user details" to={`/user/${student.user.id}`}>
                  {student.user.username}
                </Link>
              </TableCell>
              <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/students/${student.id}/details`}>
											<Tooltip title="View student details" arrow>
												<ReadMore color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/students/${student.id}/edit`}>
											<Edit />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/students/${student.id}/delete`}>
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
          {"<"}
        </Button>
       }
       
      {
      visiblePageButtons(pageNumber.valueOf(), pageCount.valueOf()).map((pNumber: number) => {
              if(pNumber >= 0){
                return <Button onClick={() => {setPageNumber(pNumber)}}>
                    {String(pNumber)}
                </Button>
              }
              else{
                return "...";
              }
            })

        }

      {pageNumber < pageCount && 
        <Button onClick={() => {setPageNumber(pageNumber + 1)}}>
          {">"}
        </Button>
       }
      </Container>
        
    )
  }