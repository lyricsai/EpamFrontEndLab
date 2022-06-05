//theme
const isDark = () => {
    return localStorage.getItem("theme");
};

const toggleRootClass = () => {
    document.querySelector(":root").classList.toggle("dark-mode");
};


if(isDark()) {
    toggleRootClass();
}

export const switchTheme = () => {

    if(isDark()) {
        localStorage.removeItem("theme");
    } else {
        localStorage.setItem("theme", "dark");
    }

    toggleRootClass();
};