export class Student {
    constructor(json) {
        this.id = json.id;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.age = json.age;
        this.avatar = json.avatar;
    }

    parse() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            avatar: this.avatar,
        }
    }
}