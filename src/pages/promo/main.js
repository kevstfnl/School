import { Theme } from "../../objects/theme";
import { createStudent, getPromoByID, getStudentAvatarByID, removePromo, updatePromo } from "../../utils/fetcher";
import { splitTDate } from "../../utils/date-utils";
new Theme();

const id = new URLSearchParams(window.location.search).get("id");
if (!id) {
    //404 page
}
const promoTitle = document.getElementById("promoTitle");
const promoNameInput = document.getElementById("promoNameInput");
const promoDescInput = document.getElementById("promoDescInput");
const dateStart = document.getElementById("dateStart");
const dateEnd = document.getElementById("dateEnd");

const editPromoState = document.getElementById("editPromoState");

promoNameInput.addEventListener("keydown", handleInputKeyPress);
promoDescInput.addEventListener("keydown", handleInputKeyPress);
dateStart.addEventListener("keydown", handleInputKeyPress);
dateEnd.addEventListener("keydown", handleInputKeyPress);
document.getElementById("editPromo").addEventListener("click", () => editPromo());
document.getElementById("deletePromo").addEventListener("click", () => {
    removePromo(id).then(() => { window.location.href = "/index.html" });
})

function handleInputKeyPress(e) {
    if (e.key == "Enter") {
        e.preventDefault();
        switch (e.target) {
            case promoNameInput: {
                promoDescInput.focus();
                break;
            }
            case promoDescInput: {
                dateStart.focus();
                break;
            }
            case dateStart: {
                dateEnd.focus();
                break;
            }
            case dateEnd: {
                editPromo();
                break;
            }
        }
    }
}

let promoLoaded = false;
let promoName;
let promoDesk;
let promoDateStart;
let promoDateEnd;
function editPromo() {
    if (promoLoaded) {
        const nameChanged = promoNameInput.value != "" && promoNameInput.value != promoName;
        const deskChanged = promoDescInput.value != "" && promoDescInput.value != promoDesk;
        const dateStartChanged = dateStart.value != "" && dateStart.value != promoDateStart;
        const dateEndChanged = dateEnd.value != "" && dateEnd.value != promoDateEnd;

        if (nameChanged || deskChanged || dateStartChanged || dateEndChanged) {
            updatePromo(id, {
                name: promoNameInput.value,
                startDate: dateStart.value,
                endDate: dateEnd.value,
                formationDescription: promoDescInput.value
            }).then((resp) => {
                const errs = resp.errors;
                if (errs) {
                    let errorMessage = "";
                    if (errs.name) {
                        promoNameInput.classList.add("bg-red");
                        errorMessage += errs.name.message + "\n";
                    }
                    if (errs.formationDescription) {
                        promoDescInput.classList.add("bg-red");
                        errorMessage += errs.formationDescription.message + "\n";
                    }
                    if (errs.startDate) {
                        dateStart.classList.add("bg-red");
                        errorMessage += errs.startDate.message + "\n";
                    }
                    if (errs.endDate) {
                        dateEnd.classList.add("bg-red");
                        errorMessage += errs.endDate.message + "\n";
                    }
                    throw new Error(errorMessage);
                }
                editPromoState.textContent = "Promotion modifier !";
            }).catch((err) => {
                editPromoState.textContent = err.message;
                editPromoState.classList.add("text-red");
            }).finally(() => {
                editPromoState.classList.remove("hidden");
                setTimeout(() => {
                    editPromoState.classList.add("hidden");
                    editPromoState.classList.remove("text-red");
                }, 3000);
            });
        }
    }
}




const studentList = document.getElementById("studentList");
const noPromo = document.getElementById("noPromo");
const studentTemplate = document.getElementById("studentTemplate");
function displayStudent() {
    studentList.textContent = "";

    getPromoByID(id)
        .then((resp) => {
            promoNameInput.value = promoName = resp.name;
            promoTitle.textContent = "Promotion: " + promoName;
            promoDescInput.value = promoDesk = resp.formationDescription;
            dateStart.value = promoDateStart = splitTDate(resp.startDate);
            dateEnd.value = promoDateEnd = splitTDate(resp.endDate);

            if (resp.students.length > 0) {
                noPromo.classList.add("hidden");
                const fragment = document.createDocumentFragment();
                resp.students.forEach((student, i) => {
                    const clone = studentTemplate.content.cloneNode(true);
                    clone.querySelector(".student-card").href = "/pages/student.html?id=" + encodeURIComponent(id) + "&student=" + encodeURIComponent(i);

                    if (student.avatar && student.avatar != "") {
                        tryToDisplayAvatar(clone.querySelector(".student-img"), student._id);
                    }
                    clone.querySelector(".student-name").textContent = student.firstName + " - " + student.lastName;
                    fragment.appendChild(clone);
                });
                studentList.appendChild(fragment);
            } else {
                noPromo.classList.remove("hidden");
            }
            promoLoaded = true;
        }).catch((err) => {
            console.error(err);
            //404 page
        });

}
displayStudent();

async function tryToDisplayAvatar(imgElement, studentID) {
    const img = await getStudentAvatarByID(id, studentID);
    imgElement.src = URL.createObjectURL(img);
}

document.getElementById("openNewStudentMenu").addEventListener("click", toggleNewStudentMenu);
document.getElementById("backToMain").addEventListener("click", toggleNewStudentMenu);

const addStudentMenu = document.getElementById("addStudentMenu");
const studentMenuForm = document.getElementById("studentMenuForm");
const newStudentFirstNameInput = document.getElementById("newStudentFirstNameInput");
const newStudentLastNameInput = document.getElementById("newStudentLastNameInput");
const newStudentAgeInput = document.getElementById("newStudentAgeInput");
const newStudentAvatarInput = document.getElementById("newStudentAvatarInput");
document.getElementById("addStudentButton").addEventListener("click", () => addStudent());

const studentMenuStateMessage = document.getElementById("studentMenuStateMessage");
const studentMenuLoader = document.getElementById("studentMenuLoader");

function toggleNewStudentMenu() {
    addStudentMenu.classList.toggle("active");
}
newStudentFirstNameInput.addEventListener("keydown", handleStudentInputKeyPress);
newStudentLastNameInput.addEventListener("keydown", handleStudentInputKeyPress);
function handleStudentInputKeyPress(e) {
    if (e.key == "Enter") {
        e.preventDefault();
        switch (e.target) {
            case newStudentFirstNameInput: {
                newStudentLastNameInput.focus();
                break;
            }
            case newStudentLastNameInput: {
                newStudentAgeInput.focus();
                break;
            }
        }
    }
}

function addStudent() {
    if (newStudentFirstNameInput.value == "") return;
    if (newStudentLastNameInput.value == "") return;
    if (newStudentAgeInput.value == "") return;

    studentMenuStateMessage.classList.add("hidden");
    studentMenuLoader.classList.remove("hidden");
    studentMenuForm.classList.add("hidden");

    const student = {
        firstName: newStudentFirstNameInput.value,
        lastName: newStudentLastNameInput.value,
        age: newStudentAgeInput.value,
        avatar: newStudentAvatarInput.value,
    }

    createStudent(id, student).then((v) => {
        const errs = v.errors;
        if (errs) {
            let errorMessage = "";
            if (errs.firstName) {
                newStudentFirstNameInput.classList.add("bg-red");
                errorMessage += errs.firstName.message + "\n";
            }
            if (errs.lastName) {
                newStudentLastNameInput.classList.add("bg-red");
                errorMessage += errs.lastName.message + "\n";
            }
            if (errs.age) {
                newStudentAgeInput.classList.add("bg-red");
                errorMessage += errs.age.message + "\n";
            }
            throw new Error(errorMessage);
        }
        studentMenuStateMessage.classList.remove("text-red");
        studentMenuStateMessage.textContent = "Promotion ajouter !";
        displayStudent();
        setTimeout(() => {
            toggleNewStudentMenu();
            studentMenuForm.classList.remove("hidden");
            studentMenuStateMessage.classList.add("hidden");
            newStudentFirstNameInput.value = "";
            newStudentLastNameInput.value = "";
            newStudentAgeInput.value = "";
            newStudentAvatarInput.value = "";
        }, 1000);
    }).catch((err) => {
        studentMenuStateMessage.classList.add("text-red");
        studentMenuStateMessage.textContent = err.message;
        studentMenuForm.classList.remove("hidden");

    }).finally(() => {
        studentMenuLoader.classList.add("hidden");
        studentMenuStateMessage.classList.remove("hidden");
        setTimeout(() => {
            newStudentFirstNameInput.classList.remove("bg-red");
            newStudentLastNameInput.classList.remove("bg-red");
            newStudentAgeInput.classList.remove("bg-red");
        }, 3000);
    });
}