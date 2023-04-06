import { SetStateAction, useEffect, useState } from "react"
import { Classroom } from "../../models/Classroom"
import Container from "@mui/material/Container/Container";
import { IconButton, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { Add, DeleteForever, Edit, ReadMore } from "@mui/icons-material";

export const ClassroomShowAll = () => {
    const [classrooms, setClassroom] = useState([])
    const [valueToOrderBy, setValueToOrderBy] = useState("name")
    const [orderDirection, setOrderDirection] = useState("asc")

    useEffect(() => {
      fetch("http://35.233.23.137/classrooms")
      .then((response) => response.json())
      .then(
        (data) => setClassroom(data)
      );
    }, []);

    const descendingComparator = (a: any, b: any, orderBy:any) =>{
      if(b[orderBy] < a[orderBy]){
        return -1;
      }
      if(b[orderBy] > a[orderBy]){
        return 1;
      }
      return 0;
    }

    const getComparator = (order: any, orderBy: any) => {
      return order === "desc"
      ? (a: any,b: any) => descendingComparator(a,b, orderBy)
      : (a: any,b: any) => -descendingComparator(a,b, orderBy)
    }

    const handleRequestSort = (event: any, property: SetStateAction<string>) =>{
      const isAscending = (valueToOrderBy === property && orderDirection === "asc")
      setValueToOrderBy(property)
      setOrderDirection(isAscending? "desc" : "asc")
    }

    const createSortHandler = (property: SetStateAction<string>) => (event: any) =>{
      handleRequestSort(event, property)
    }

    const sortedRowInformation = (rowArray: any, comparator: any) => {
      const stabilizedRowArray = rowArray.map((el: any, index: any) => [el, index])
      stabilizedRowArray.sort((a: any,b: any) => {
        const order = comparator(a[0], b[0])
        if(order !== 0) return order
        return a[1] - b[1]
      })
      return stabilizedRowArray.map((el:any) => el[0])
    }
    
    
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
								<TableCell align="right">
                  <TableSortLabel
                    active={valueToOrderBy === "name"}
                    direction={valueToOrderBy === "name" && orderDirection === "desc"? "desc": "asc"}
                    onClick={createSortHandler("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
								<TableCell align="right">
                <TableSortLabel
                    active={valueToOrderBy === "location"}
                    direction={valueToOrderBy === "location" && orderDirection === "desc"? "desc": "asc"}
                    onClick={createSortHandler("location")}
                  >
                    Location
                  </TableSortLabel>
                </TableCell>
								<TableCell align="right">
                <TableSortLabel
                    active={valueToOrderBy === "capacity"}
                    direction={valueToOrderBy === "capacity" && orderDirection === "desc"? "desc": "asc"}
                    onClick={createSortHandler("capacity")}
                  >
                    Capacity
                  </TableSortLabel>
                  </TableCell>
                <TableCell align="right">
                <TableSortLabel
                    active={valueToOrderBy === "allocatedFunds"}
                    direction={valueToOrderBy === "allocatedFunds" && orderDirection === "desc"? "desc": "asc"}
                    onClick={createSortHandler("allocatedFunds")}
                  >
                    Allocated funds
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                <TableSortLabel
                    active={valueToOrderBy === "homeroomTeacher"}
                    direction={valueToOrderBy === "homeroomTeacher" && orderDirection === "desc"? "desc": "asc"}
                    onClick={createSortHandler("homeroomTeacher")}
                  >
                    Homeroom teacher
                  </TableSortLabel>
                </TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
           {sortedRowInformation(classrooms, getComparator(orderDirection, valueToOrderBy)).map((classroom: Classroom, index: number) => (
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