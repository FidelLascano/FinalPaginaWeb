const productos = [
    { id: 1, img:'https://polipapel.vteximg.com.br/arquivos/ids/158002-1000-1000/lapices-Y00836.jpg?v=637227641003330000', description: 'Lapices Craft', details: 'detalles', price:  30, stock: 10},
    { id: 2, img:'', description: 'Lapices Faber', details: 'detalles', price:  12, stock: 20}
]

const createProduct = (product) =>
    (` <div class="card">
                <img src="${product.img}" class="card-img-top" alt="..."> 
                <div class="card-body">
                <p class="card-text">${product.description}</p>
                <p class="card-text">${product.details}</p>
                <p class="card-text">${product.price}</p>
                <p class="card-text">${product.stock}</p>
                <button class="btn btn-primary">Comprar</button>
                </div>
            </div>`)

const container = document.querySelector('.products-container');
const renderProducts = (products, container) => {
    products.forEach(product => {
        const html = createProduct(product);
        container.innerHTML += html;
    });
}



const toggleIcon = (element, [texX, textY]) => {
    element.textContent = element.textContent === texX ? textY : texX;
};


const router = (element, path) => {
    element.innerHTML = "Cargando...";
    fetch(`${path}.html`)
        .then((response) => response.text())
        .then((html) => {
            element.innerHTML = html;
            path === 'fragments/shop' && renderProducts(productos, container);
        }).finally(
            () => {
                switch (path) {
                    case 'fragments/shop':{
                        const container = document.querySelector('.products-container');
                        renderProducts(productos, container);
                    }
                }
            }
    );
}

document.addEventListener("DOMContentLoaded", function (event) {
    //Agregando event de busqueda
    const btnSearch = document.querySelector(".btn-search");
    btnSearch.addEventListener("click", function (event) {
        event.preventDefault();
        const currenText = event.target.textContent;
        toggleIcon(event.target, ["close", "search"])
        const search = document.querySelector(".nav-section-search");
        const hideShowClass = currenText === 'close' ? "hide" : "show";
        search.setAttribute("class", `nav-section-search ${hideShowClass}`)
    });

    //Agregando event de menu
    const menuItems = document.querySelectorAll("a[data-to]");
    menuItems.forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const path = event.currentTarget.getAttribute("data-to");
            const element = document.querySelector('#content-page');
            router(element, `fragments/${path}`);
        });
    });

});
