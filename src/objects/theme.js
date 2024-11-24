export class Theme {
    constructor() {
        this.toggleThemeButton = document.getElementById("toggleTheme");
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add("dark");
            }
        }
        this.toggleThemeButton.addEventListener("click", this.toggleTheme);
    }
    toggleTheme() {
        document.documentElement.classList.toggle("dark");
    }
}