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
import { StudentAdd } from './components/student/StudentAdd'
import { StudentDetails } from './components/student/StudentDetails'
import { StudentEdit } from './components/student/StudentEdit'
import { StudentDelete } from './components/student/StudentDelete'
import { TeacherAdd } from './components/teacher/TeacherAdd'
import { TeacherDetails } from './components/teacher/TeacherDetails'
import { TeacherEdit } from './components/teacher/TeacherEdit'
import { TeacherDelete } from './components/teacher/TeacherDelete'
import { SubjectShowAll } from './components/subject/SubjectShowAll'
import { SubjectAdd } from './components/subject/SubjectAdd'
import { SubjectDetails } from './components/subject/SubjectDetails'
import { SubjectEdit } from './components/subject/SubjectEdit'
import { SubjectDelete } from './components/subject/SubjectDelete'
import { TeacherSubjectShowAll } from './components/teacherSubject/TeacherSubjectShowAll'
import { TeacherSubjectAdd } from './components/teacherSubject/TeacherSubjectAdd'
import { TeacherSubjectDetails } from './components/teacherSubject/TeacherSubjectDetails'
import { TeacherSubjectEdit } from './components/teacherSubject/TeacherSubjectEdit'
import { TeacherSubjectDelete } from './components/teacherSubject/TeacherSubjectDelete'
import { LogInPage } from './components/authentication/LogInPage'
import { SignUpPage } from './components/authentication/SignUpPage'
import { ActivationPage } from './components/authentication/ActivationPage'
import { UserProfile } from './components/users/UserProfile'

function App() {

  return (

      <React.Fragment>
        <BrowserRouter>
          <Menu />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogInPage/>} />
                <Route path="/register" element={<SignUpPage/>} />
                <Route path="/register/confirm/:code" element={<ActivationPage/>} />
                <Route path="/user/:userId" element={<UserProfile/>} />
                <Route path="/teachers" element={<TeacherShowAll />} />
                <Route path="/teachers/add" element={<TeacherAdd />} />
                <Route path="/teachers/:teacherId/details" element={<TeacherDetails />} />
                <Route path="/teachers/:teacherId/edit" element={<TeacherEdit />} />
                <Route path="/teachers/:teacherId/delete" element={<TeacherDelete />} />
                <Route path="/subjects" element={<SubjectShowAll />} />
                <Route path="/subjects/add" element={<SubjectAdd />} />
                <Route path="/subjects/:subjectId/details" element={<SubjectDetails />} />
                <Route path="/subjects/:subjectId/edit" element={<SubjectEdit />} />
                <Route path="/subjects/:subjectId/delete" element={<SubjectDelete />} />
                <Route path="/teacher-subjects" element={<TeacherSubjectShowAll />} />
                <Route path="/teacher-subjects/add" element={<TeacherSubjectAdd />} />
                <Route path="/teacher-subjects/:teacher-subjectId/details" element={<TeacherSubjectDetails />} />
                <Route path="/teacher-subjects/:teacher-subjectId/edit" element={<TeacherSubjectEdit />} />
                <Route path="/teacher-subjects/:teacher-subjectId/delete" element={<TeacherSubjectDelete />} />
                <Route path="/students" element={<StudentShowAll />} />
                <Route path="/students/add" element={<StudentAdd />} />
                <Route path="/students/:studentId/details" element={<StudentDetails />} />
					      <Route path="/students/:studentId/edit"  element={<StudentEdit/>}/>
					      <Route path="/students/:studentId/delete"  element={<StudentDelete/>}/>
                <Route path="/classrooms" element={<ClassroomShowAll />} />
                <Route path="/classrooms/add" element={<ClassroomAdd />} />
                <Route path="/classrooms/:classroomId/details" element={<ClassroomDetails />} />
					      <Route path="/classrooms/:classroomId/edit"  element={<ClassroomEdit/>}/>
					      <Route path="/classrooms/:classroomId/delete"  element={<ClassroomDelete/>}/>
            </Routes>
        </BrowserRouter>
      </React.Fragment>
  )
}

export default App
