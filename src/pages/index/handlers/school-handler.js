import { getMe, setMe } from "../../../utils/fetcher";
export class SchoolHandler {

    constructor() {
        this.title = document.getElementById("title");
        this.schoolNameInput = document.getElementById("schoolNameInput");
        document.getElementById("editSchool").addEventListener("click", this.handleUserEntry);
        this.schoolNameInput.addEventListener("keydown", this.handleInputKeyPress);
        getMe().then((me) => {
            document.title = me.name;
            this.title.textContent = me.name;
            this.schoolNameInput.value = me.name;
        });
    }

    handleInputKeyPress(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.handleUserEntry;
        }
    }
    handleUserEntry() {
        if (schoolNameInput.value != "" && schoolNameInput.value != document.title) {
            setMe(schoolNameInput.value);
            document.title = schoolNameInput.value;
            title.textContent = schoolNameInput.value;
        }
    }
}