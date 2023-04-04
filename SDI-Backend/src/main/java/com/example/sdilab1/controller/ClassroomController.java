package com.example.sdilab1.controller;

import com.example.sdilab1.model.Classroom;
import com.example.sdilab1.model.ClassroomDTO;
import com.example.sdilab1.model.Message;
import com.example.sdilab1.service.ClassroomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ClassroomController {
    private final ClassroomService service;

    public ClassroomController(ClassroomService service) {
        this.service = service;
    }

    @GetMapping("/classrooms")
    public List<Classroom> all() {
        return service.all();
    }

    @GetMapping("/classrooms/{id}")
    public ClassroomDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/classrooms")
    public ResponseEntity<Message> newClassroom(@RequestBody ClassroomDTO newClassroom){
        try {
            service.newClassroom(newClassroom);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/classrooms/{id}/students")
    public void addStudentsInBulk(@RequestBody List<Integer> student_ids, @PathVariable Integer id){
        service.addStudentsInBulk(student_ids, id);
    }

    @PutMapping("/classrooms/{id}")
    public ResponseEntity<Message> modifyClassroom(@RequestBody ClassroomDTO newClassroomDTO, @PathVariable Integer id) throws Exception {
        try {
            service.modifyClassroom(newClassroomDTO,id);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/classrooms/{id}")
    public void deleteClassroom(@PathVariable Integer id){
        service.deleteClassroom(id);
    }
}
