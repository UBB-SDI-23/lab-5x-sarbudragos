package com.example.sdilab1;

import com.example.sdilab1.controller.StudentController;
import com.example.sdilab1.controller.SubjectController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class SdiLab1ApplicationTests {

    @Autowired
    MockMvc mockMvc;


    @Autowired
    StudentController studentController;

    @Autowired
    SubjectController subjectController;


    @Test
    public void studentController_getAllStudentsWithAverageGradeBiggerThan_success() throws Exception {


        mockMvc.perform(MockMvcRequestBuilders
                        .get("/students/grade-filter?grade=8.0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect( jsonPath("$[1].firstName", startsWith("Darius")));
    }

    @Test
    public void subjectController_getSubjectsOrderedByMaximumSalary_success() throws Exception {


        mockMvc.perform(MockMvcRequestBuilders
                        .get("/subjects/order-by-max-salary")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect( jsonPath("$[1].name", startsWith("Science")));
    }

    @Test
    public void subjectController_getOrderedByAverageYearsOfExperience_success() throws Exception {


        mockMvc.perform(MockMvcRequestBuilders
                        .get("/subjects/order-by-average-years-of-experience")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect( jsonPath("$[0].name", startsWith("Music")));
    }

    @Test
    void contextLoads() {
    }

}
