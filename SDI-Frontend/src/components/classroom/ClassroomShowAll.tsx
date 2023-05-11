import { ReactNode, SetStateAction, useEffect, useState } from "react"
import { Classroom } from "../../models/Classroom"
import Container from "@mui/material/Container/Container";
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { Add, DeleteForever, Edit, ReadMore } from "@mui/icons-material";
import { BACKEND_ADDR } from "../../backendAddress";
import { ClassroomShowAllDTO } from "../../models/ClassroomShowAllDTO";
import { result } from "lodash";

export const ClassroomShowAll = () => {
    const [classrooms, setClassroom] = useState([])
    const [loading, setLoading] = useState(false);
    const [valueToOrderBy, setValueToOrderBy] = useState("name")
    const [orderDirection, setOrderDirection] = useState("asc")
    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
      setLoading(true);
      fetch(`${BACKEND_ADDR}/classrooms?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setPageCount(data.totalPages - 1)
          setClassroom(data.content);
          setLoading(false);
      }
      );
    }, [pageNumber, pageSize]);

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
    
    
  function handlePageSizeChange(event: SelectChangeEvent<number>, child: ReactNode): void {
    setPageSize(Number(event.target.value))
  }

    return (
      <Container>
        {loading && <CircularProgress />}
        {!loading && classrooms.length === 0 && <div>No classrooms.</div>}
        {(
				<IconButton component={Link} sx={{ mr: 3 }} to={`/classrooms/add`}>
					<Tooltip title="Add a new classroom" arrow>
						<Add color="primary" />
					</Tooltip>
				</IconButton>
			)}

       {!loading && classrooms.length > 0 &&
         <div className="App">
         <h1>All classrooms</h1>
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
                <TableCell align="right">
                <TableSortLabel
                    active={valueToOrderBy === "studentsAverageGrade"}
                    direction={valueToOrderBy === "studentsAverageGrade" && orderDirection === "desc"? "desc": "asc"}
                    onClick={createSortHandler("studentsAverageGrade")}
                  >
                    Average grade
                  </TableSortLabel>
                </TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
           {sortedRowInformation(classrooms, getComparator(orderDirection, valueToOrderBy)).map((classroom: ClassroomShowAllDTO, index: number) => (
            <TableRow key={classroom.id}>
              <TableCell component="th" scope="row">
                {pageNumber*10 + index + 1}
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
              <TableCell align="right">{classroom.studentsAverageGrade}</TableCell>
              <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/classrooms/${classroom.id}/details`}>
											<Tooltip title="View student details" arrow>
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