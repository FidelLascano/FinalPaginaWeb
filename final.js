const productos = [
    {
        id: 1,
        img: 'https://polipapel.vteximg.com.br/arquivos/ids/158002-1000-1000/lapices-Y00836.jpg?v=637227641003330000',
        description: 'Lapices Craft',
        details: 'detalles',
        price: 30,
        stock: 10,
        category: 'lapices'
    },
    {
        id: 2,
        img: 'https://juanmarcet.com/wp-content/uploads/2021/01/0201132470.jpg',
        description: 'Lapices Faber',
        details: 'detalles',
        price: 12,
        stock: 20,
        category: 'lapices'
    },
    {
        id: 3,
        img: 'https://juanmarcet.com/wp-content/uploads/2021/04/0201118248.jpg',
        description: 'Cuaderno De Dibujo Espiral',
        details: 'detalles',
        price: 7.75,
        stock: 80,
        category: 'cuadernos'
    },
    {
        id: 4,
        img: 'https://juanmarcet.com/wp-content/uploads/2022/09/00210326-1.jpg',
        description: 'Cuaderno Grapado Escribe Dibujo',
        details: 'detalles',
        price: 0.66,
        stock: 80,
        category: 'cuadernos'
    }
]


const cart = [];

const fnAddToCart = (event, id) => {
    const product = productos.find((product) => product.id === id);
    const productInCart = cart.find((product) => product.id === id);
    const stock = document.querySelector(`#stock-${id}`);
    if (product.stock > 0) {
        product.stock--;
        if (productInCart) {productInCart.stock++;}
        else {cart.push({...product, stock:1});}
        stock.textContent = product.stock;
        console.log(cart);
    }
};

const createProduct = (product) =>
    (` <div class="card">
                <img src="${product.img}" class="card-img-top" alt="..."> 
                <div class="card-body">
                <p class="card-text card-description">
                    <span class="card-item-title"></span>
                    <span class="card-item-value">${product.description}</span>
                </p>
                <p class="card-text card-price">
                    ${product.price}
                </p>
                <p class="card-text card-stock">
                    <span class="card-item-title">Stock:</span>
                    <span class="card-item-value" id="stock-${product.id}">${product.stock}</span>
                </p>
                    <button class="btn btn-primary card-botton" onclick="fnAddToCart(event,${product.id})">Comprar</button>
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
        }).finally(
        () => {
            switch (path) {
                case 'fragments/shop': {
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
