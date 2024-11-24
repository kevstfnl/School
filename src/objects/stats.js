export class Stats {

    constructor() {
        this.promos = 0;
        this.currentPromos = 0;
        this.waitingPromos = 0;
        this.students = 0;
        this.currentStudents = 0;
        this.waitingStudents = 0;
        this.studentsByPromos = 0;
    }

    display() {
        document.getElementById("statsPromos").textContent = this.promos;
        document.getElementById("statsCurPromos").textContent = this.currentPromos;
        document.getElementById("statsWaitPromos").textContent = this.waitingPromos;
        document.getElementById("statsStudent").textContent = this.students;
        document.getElementById("statsCurStudent").textContent = this.currentStudents;
        document.getElementById("statsWaitStudent").textContent = this.waitingStudents;
        document.getElementById("statsStudentAverage").textContent = this.promos > 0 ? this.students / this.promos : 0;
        document.getElementById("statsContainer").classList.remove("hidden");
        document.getElementById("statsLoader").classList.add("hidden");
    }
    reset() {
        this.promos = 0;
        this.currentPromos = 0;
        this.waitingPromos = 0;
        this.students = 0;
        this.currentStudents = 0;
        this.waitingStudents = 0;
        this.studentsByPromos = 0;
    }

}