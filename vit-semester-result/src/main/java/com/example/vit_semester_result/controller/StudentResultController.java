package com.example.vit_semester_result.controller;

import com.example.vit_semester_result.entity.StudentResult;
import com.example.vit_semester_result.repository.StudentResultRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class StudentResultController {

    private final StudentResultRepository repository;

    public StudentResultController(StudentResultRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public String showForm(Model model) {
        model.addAttribute("studentResult", new StudentResult());
        return "index";
    }

    @PostMapping("/calculate")
    public String calculateResult(StudentResult student, Model model) {

        double total = 0;

        total += (student.getSubject1Mse() * 0.30)
                + (student.getSubject1Ese() * 0.70);

        total += (student.getSubject2Mse() * 0.30)
                + (student.getSubject2Ese() * 0.70);

        total += (student.getSubject3Mse() * 0.30)
                + (student.getSubject3Ese() * 0.70);

        total += (student.getSubject4Mse() * 0.30)
                + (student.getSubject4Ese() * 0.70);

        double percentage = total / 4;

        String grade;

        if (percentage >= 90) {
            grade = "A+";
        } else if (percentage >= 80) {
            grade = "A";
        } else if (percentage >= 70) {
            grade = "B+";
        } else if (percentage >= 60) {
            grade = "B";
        } else if (percentage >= 50) {
            grade = "C";
        } else if (percentage >= 40) {
            grade = "D";
        } else {
            grade = "F";
        }

        String result = percentage >= 40 ? "PASS" : "FAIL";

        student.setTotalMarks(total);
        student.setPercentage(percentage);
        student.setGrade(grade);
        student.setResult(result);

        repository.save(student);

        model.addAttribute("studentResult", student);

        return "result";
    }
}