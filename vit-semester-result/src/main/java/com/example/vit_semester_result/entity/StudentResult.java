package com.example.vit_semester_result.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StudentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rollNo;
    private String studentName;

    private double subject1Mse;
    private double subject1Ese;

    private double subject2Mse;
    private double subject2Ese;

    private double subject3Mse;
    private double subject3Ese;

    private double subject4Mse;
    private double subject4Ese;

    private double totalMarks;
    private double percentage;
    private String grade;
    private String result;

    public StudentResult() {
    }

    public Long getId() {
        return id;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public double getSubject1Mse() {
        return subject1Mse;
    }

    public void setSubject1Mse(double subject1Mse) {
        this.subject1Mse = subject1Mse;
    }

    public double getSubject1Ese() {
        return subject1Ese;
    }

    public void setSubject1Ese(double subject1Ese) {
        this.subject1Ese = subject1Ese;
    }

    public double getSubject2Mse() {
        return subject2Mse;
    }

    public void setSubject2Mse(double subject2Mse) {
        this.subject2Mse = subject2Mse;
    }

    public double getSubject2Ese() {
        return subject2Ese;
    }

    public void setSubject2Ese(double subject2Ese) {
        this.subject2Ese = subject2Ese;
    }

    public double getSubject3Mse() {
        return subject3Mse;
    }

    public void setSubject3Mse(double subject3Mse) {
        this.subject3Mse = subject3Mse;
    }

    public double getSubject3Ese() {
        return subject3Ese;
    }

    public void setSubject3Ese(double subject3Ese) {
        this.subject3Ese = subject3Ese;
    }

    public double getSubject4Mse() {
        return subject4Mse;
    }

    public void setSubject4Mse(double subject4Mse) {
        this.subject4Mse = subject4Mse;
    }

    public double getSubject4Ese() {
        return subject4Ese;
    }

    public void setSubject4Ese(double subject4Ese) {
        this.subject4Ese = subject4Ese;
    }

    public double getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(double totalMarks) {
        this.totalMarks = totalMarks;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}