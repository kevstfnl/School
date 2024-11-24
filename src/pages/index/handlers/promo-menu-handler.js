import { createPromo } from "../../../utils/fetcher";

export class PromoMenuHandler {
    constructor(instance) {
        this.instance = instance;

        this.backToMain = document.getElementById("backToMain");
        this.togglePromotionMenuButton = document.getElementById("togglePromotionMenuButton");
        this.addPromoMenu = document.getElementById("addPromoMenu");
        this.addPromotionButton = document.getElementById("addPromotionButton");



        this.newPromoNameInput = document.getElementById("newPromoNameInput");
        this.newPromoDescInput = document.getElementById("newPromoDescInput");
        this.dateStart = document.getElementById("dateStart");
        this.dateEnd = document.getElementById("dateEnd");
        this.promoMenuLoader = document.getElementById("promoMenuLoader");
        this.promoMenuStateMessage = document.getElementById("promoMenuStateMessage");
        this.promoMenuForm = document.getElementById("promoMenuForm");



        this.newPromoNameInput.addEventListener("keypress", this.handlePromotionInputKeyPress.bind(this));
        this.newPromoDescInput.addEventListener("keypress", this.handlePromotionInputKeyPress.bind(this));
        this.dateStart.addEventListener("keypress", this.handlePromotionInputKeyPress.bind(this));
        this.dateEnd.addEventListener("keypress", this.handlePromotionInputKeyPress.bind(this));
        this.backToMain.addEventListener("click", this.handleToggleNewPromoMenu.bind(this));
        this.togglePromotionMenuButton.addEventListener("click", this.handleToggleNewPromoMenu.bind(this));
        this.addPromotionButton.addEventListener("click", this.addPromotion.bind(this));
    }

    handleToggleNewPromoMenu() {
        this.addPromoMenu.classList.toggle("active");
    }

    handlePromotionInputKeyPress(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            switch (e.target) {
                case this.newPromoNameInput: {
                    this.newPromoDescInput.focus();
                    break;
                }
                case this.newPromoDescInput: {
                    this.dateStart.focus();
                    break;
                }
                case this.dateStart: {
                    this.dateEnd.focus();
                    break;
                }
                case this.dateEnd: {
                    this.addPromotion.bind(this);
                    break;
                }
            }
        }
    }
    addPromotion() {
        if (this.newPromoNameInput.value == "") return;
        if (this.dateStart.value == "") return;
        if (this.dateEnd.value == "") return;

        this.promoMenuStateMessage.classList.add("hidden");
        this.promoMenuLoader.classList.remove("hidden");
        this.promoMenuForm.classList.add("hidden");



        const promo = {
            name: this.newPromoNameInput.value,
            startDate: this.dateStart.value,
            endDate: this.dateEnd.value,
            formationDescription: this.newPromoDescInput.value,
        }

        createPromo(promo)
            .then((v) => {
                const errs = v.errors;
                if (errs) {
                    let errorMessage = "";
                    if (errs.name) {
                        this.newPromoNameInput.classList.add("bg-red");
                        errorMessage += errs.name.message + "\n";
                    }
                    if (errs.formationDescription) {
                        this.newPromoDescInput.classList.add("bg-red");
                        errorMessage += errs.formationDescription.message + "\n";
                    }
                    if (errs.startDate) {
                        this.dateStart.classList.add("bg-red");
                        errorMessage += errs.startDate.message + "\n";
                    }
                    if (errs.endDate) {
                        this.dateEnd.classList.add("bg-red");
                        errorMessage += errs.endDate.message + "\n";
                    }
                    throw new Error(errorMessage);
                }
                this.promoMenuStateMessage.classList.remove("text-red");
                this.promoMenuStateMessage.textContent = "Promotion ajouter !";
                this.instance.promoHandler.loadPromos();
                setTimeout(() => {
                    this.handleToggleNewPromoMenu();
                    this.promoMenuForm.classList.remove("hidden");
                    this.promoMenuStateMessage.classList.add("hidden");
                    this.newPromoNameInput.value = "";
                    this.newPromoDescInput.value = "";
                    this.dateStart.value = "";
                    this.dateEnd.value = "";
                }, 1000);
            }).catch((err) => {
                this.promoMenuStateMessage.classList.add("text-red");
                this.promoMenuStateMessage.textContent = err.message;
                this.promoMenuForm.classList.remove("hidden");
            })
            .finally(() => {
                this.promoMenuLoader.classList.add("hidden");
                this.promoMenuStateMessage.classList.remove("hidden");
                setTimeout(() => {
                    this.newPromoNameInput.classList.remove("bg-red");
                    this.newPromoDescInput.classList.remove("bg-red");
                    this.dateStart.classList.remove("bg-red");
                    this.dateEnd.classList.remove("bg-red");
                }, 3000);
            });
    }
}