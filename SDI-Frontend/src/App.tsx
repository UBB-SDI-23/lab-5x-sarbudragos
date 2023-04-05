import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Menu } from './components/Menu'
import { Home } from './components/Home'
import { ClassroomShowAll } from './components/classroom/ClassroomShowAll'
import { TeacherShowAll } from './components/teacher/TeacherShowAll'
import { StudentShowAll } from './components/student/StudentShowAll'
import { ClassroomAdd } from './components/classroom/ClassroomAdd'
import { ClassroomDetails } from './components/classroom/ClassroomDetails'
import { ClassroomDelete } from './components/classroom/ClassroomDelete'
import { ClassroomEdit } from './components/classroom/ClassroomEdit'

function App() {

  return (

      <React.Fragment>
        <BrowserRouter>
          <Menu />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teachers" element={<TeacherShowAll />} />
                <Route path="/students" element={<StudentShowAll />} />
                <Route path="/classrooms" element={<ClassroomShowAll />} />
                <Route path="/classrooms/add/" element={<ClassroomAdd />} />
                <Route path="/classrooms/:classroomId/details" element={<ClassroomDetails />} />
					      <Route path="/classrooms/:classroomId/edit"  element={<ClassroomEdit/>}/>
					      <Route path="/classrooms/:classroomId/delete"  element={<ClassroomDelete/>}/>
            </Routes>
        </BrowserRouter>
      </React.Fragment>
  )
}

export default App
