export class Promo {
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.students = json.students;

        this.startDate = json.startDate;
        this.endDate = json.endDate;
        this.createdAt = json.createdAt;
        this.updatedAt = json.updatedAt;
    }

    parse() {
        return {
            id: this.id,
            name: this.name,
            students: this.students,
            startDate: this.startDate,
            endDate: this.endDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}