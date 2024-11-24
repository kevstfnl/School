import { Theme } from "../../objects/theme";
import { getPromoByID, updateStudent } from "../../utils/fetcher";
new Theme();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const studentIndex = params.get("student");
if (!id || !studentIndex) {
    //404 page
}

const backLink = document.getElementById("backLink");
backLink.href = "/pages/promo.html?id=" + encodeURIComponent(id);

const name = document.getElementById("name");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const promotion = document.getElementById("promo");
const avatar = document.getElementById("avatar");

const studentFirstNameInput = document.getElementById("studentFirstNameInput");
const studentLastNameInput = document.getElementById("studentLastNameInput");
const studentAgeInput = document.getElementById("studentAgeInput");
const studentAvatarInput = document.getElementById("studentAvatarInput");
const editStudent = document.getElementById("editStudent");

const editStudentState = document.getElementById("editStudentState");
studentFirstNameInput.addEventListener("keydown", handleInputKeyPress);
studentLastNameInput.addEventListener("keydown", handleInputKeyPress);

function handleInputKeyPress(e) {
    if (e.key == "Enter") {
        e.preventDefault();
        switch (e.target) {
            case studentFirstNameInput: {
                studentLastNameInput.focus();
                break;
            }
            case studentLastNameInput: {
                studentAgeInput.focus();
                break;
            }
        }
    }
}

getPromoByID(id).then((promo) => {
    const student = promo.students[studentIndex];
    name.textContent = student.firstName;
    lastName.textContent = student.lastName;
    age.textContent = student.age;
    promotion.textContent = promo.name;

    studentFirstNameInput.value = student.firstName;
    studentLastNameInput.value = student.lastName;
    studentAgeInput.value = student.age;
    if (student.avatar && student.avatar != "") {
        tryToDisplayAvatar(student._id);
    }

    editStudent.addEventListener("click", () => {
        updateStudent(id, student._id, {
            firstName: studentFirstNameInput.value,
            lastName: studentLastNameInput.value,
            age: studentAgeInput.value,
            avatar: studentAvatarInput.value
        }).then((resp) => {
            editStudentState.textContent = "Promotion modifier !";
        }).catch((err) => {
            editStudentState.textContent = "Une erreur est survenue";
            editStudentState.classList.add("text-red");
        }).finally(() => {
            editStudentState.classList.remove("hidden");

            setTimeout(() => {
                editStudentState.classList.add("hidden");
                editStudentState.classList.remove("text-red");
            }, 3000);
        });
    });
}).catch((err) => {
    console.error(err);
    //404 page
})



async function tryToDisplayAvatar(studentID) {
    const img = await getStudentAvatarByID(id, studentID);
    avatar.src = URL.createObjectURL(img);
}
