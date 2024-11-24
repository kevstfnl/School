export class School {
    constructor(json) {
        this.name = json.name;
        this.mail = json.mail;
        this.slug = json.slug;
        this.promos = json.promos;
    }

    parse() {
        return {
            name: this.name,
            mail: this.mail,
            slug: this.slug,
            promos: this.promos
        }
    }
}