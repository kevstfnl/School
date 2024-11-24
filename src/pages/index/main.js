import { Theme } from "../../objects/theme";
import { PromoMenuHandler } from "./handlers/promo-menu-handler";
import { PromotionsHandler } from "./handlers/promos-handler";
import { SchoolHandler } from "./handlers/school-handler";


class IndexInstance {
    constructor() {
        this.theme = new Theme();
        this.schoolHandler = new SchoolHandler();
        this.promoHandler = new PromotionsHandler();
        this.menuHandler = new PromoMenuHandler(this);
    }
}
new IndexInstance();


