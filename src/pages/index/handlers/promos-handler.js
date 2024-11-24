import { Stats } from "../../../objects/stats";
import { getPromos } from "../../../utils/fetcher";
import { splitTDate, formatDate } from "../../../utils/date-utils";

export class PromotionsHandler {
    constructor() {
        this.stats = new Stats();
        this.promoLoader = document.getElementById("promoLoader");
        this.noPromoMessage = document.getElementById("noPromo");
        this.promosList = document.getElementById("promosList");
        this.promosCardsTemplate = document.getElementById("promosCardsTemplate");
        this.loadPromos();
    }

    loadPromos() {
        this.resetView();
        getPromos().then((promos) => {
            this.stats.promos = promos.length;
            if (promos.length > 0) {
                const fragment = document.createDocumentFragment();

                promos.forEach(promo => {
                    this.stats.students += promo.students.length;

                    const clone = this.promosCardsTemplate.content.cloneNode(true);
                    const card = clone.querySelector(".card");
                    card.href = "/pages/promo.html?id=" + encodeURIComponent(promo._id);
                    clone.querySelector(".promo-name").textContent = promo.name;

                    const displayedDate = clone.querySelector(".promo-date");
                    const now = new Date();
                    const start = new Date(promo.startDate);

                    if (start <= now) {
                        this.stats.currentPromos++;
                        this.stats.currentStudents += promo.students.length;
                        displayedDate.textContent = "Date de fin: " + formatDate(splitTDate(new Date(promo.endDate).toISOString()));
                        card.classList.add("bg-green");
                    } else {
                        this.stats.waitingPromos++;
                        this.stats.waitingStudents += promo.students.length;
                        displayedDate.textContent = "Date de debut: " + formatDate(splitTDate(start.toISOString()));
                        card.classList.add("bg-orange");
                    }

                    fragment.appendChild(clone);
                });

                this.promosList.appendChild(fragment);
                this.promosList.classList.remove("hidden");
                this.initCardsEffect();
            } else {
                this.noPromoMessage.classList.remove("hidden");
            }
            this.stats.display();
        }).catch(() => {
            this.noPromoMessage.classList.remove("hidden");
        }).finally(() => {
            this.promoLoader.classList.add("hidden");
        });
    }

    resetView() {
        while (this.promosList.firstChild) this.promosList.removeChild(this.promosList.firstChild);
        this.stats.reset();
        this.noPromoMessage.classList.add("hidden");
        this.promosList.classList.add("hidden");
        this.promoLoader.classList.remove("hidden");
    }

    initCardsEffect() {
        const cards = document.querySelectorAll(".card-container");
        cards.forEach(card => card.addEventListener("mousemove", handleMouseMovementInCards));
        function handleMouseMovementInCards(e) {
            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const effect = card.querySelector(".card-effect");
                effect.style.opacity = "1";
                effect.style.translate = `calc(${e.clientX - cardRect.left}px - 50%) calc(${e.clientY - cardRect.top}px - 50%)`;
            });
        }
    }
}