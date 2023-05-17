const toggleIcon = (element, [texX, textY]) => {
    element.textContent = element.textContent === texX ? textY : texX;
};
document.addEventListener("DOMContentLoaded", function(event) {
    //Agregando event de busqueda
    const btnSearch = document.querySelector(".btn-search");
    btnSearch.addEventListener("click", function(event) {
        event.preventDefault();
        const currenText = event.target.textContent;
        toggleIcon(event.target, ["close", "search"])
       const search = document.querySelector(".nav-section-search");
       const hideShowClass = currenText === 'close' ? "hide" : "show";
       search.setAttribute("class", `nav-section-search ${hideShowClass}`)
    });

});