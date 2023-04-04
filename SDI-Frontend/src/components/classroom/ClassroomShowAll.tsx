import { useEffect, useState } from "react"
import { Classroom } from "../../models/Classroom"

export const ClassroomShowAll = () => {
    const [classrooms, setClassroom] = useState([])

    useEffect(() => {
      fetch("http://35.233.23.137/classrooms")
      .then((response) => response.json())
      .then(
        (data) => setClassroom(data)
      );
    }, []);
    
    if(classrooms.length === 0)
      return(<div>No classromms.</div>)
  
    return (
        <div className="App">
        <h1>Classroom list</h1>
        <table>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>location</th>
            <th>capacity</th>
            <th>allocated funds</th>
            <th>homeroom teacher</th>
          </tr>
          {classrooms.map((classroom: Classroom, index) => (
            <tr key={index}>
                <td>{index}</td>
                <td>{classroom.name}</td>
                <td>{classroom.location}</td>
                <td>{classroom.capacity}</td>
                <td>{classroom.allocatedFunds}</td>
                <td>{classroom.homeroomTeacher}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
  
  export default ClassroomShowAll