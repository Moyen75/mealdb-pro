// fetch data by categories  
const loadMealByCategories = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`
    fetch(url)
        .then(res => res.json())
        .then(data => getMealByCategories(data.categories))
}
// show all categories 
const getMealByCategories = categories => {
    console.log(categories);
    const showProducts = document.getElementById('show-products')
    categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
                 <img src="${category.strCategoryThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                     <h5 class="card-title">${category.strCategory}</h5>
                     <button class="click bg-warning" onclick="seeCategories('${category.strCategory}')">see categories</button>
        </div>
    </div>
        `
        showProducts.appendChild(div);
    })
}
// fetch same categories 
const seeCategories = categoryName => {
    document.getElementById('show-products').textContent = '';
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    fetch(url)
        .then(res => res.json())
        .then(data => showSameCategory(data.meals))
}
// show same categories
const showSameCategory = sameCategory => {
    console.log(sameCategory)
    const showSameCategoryProduct = document.getElementById('show-products');
    sameCategory.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
                 <img src="${category.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                     <h5 class="card-title">${category.strMeal}</h5>
                      <div class ="d-flex justify-content-between">
                      <button class="rounded bg-warning" onclick="addToCart()">Add to cart</button>
                     <button data-bs-toggle="modal" data-bs-target="#myModal" class="rounded bg-warning"  onclick="seeCurrentProduct('${category.idMeal}')">Details</button>
                      </div>
        </div>
    </div>
        `
        showSameCategoryProduct.appendChild(div);
    })
}
// add to cart 
const addToCart = () => {
    let previousText = document.getElementById('cart');
    let previous = parseInt(previousText.innerText)
    previousText.innerText = previous + 1;
}
// fetch details 
const seeCurrentProduct = id => {
    document.getElementById('details').textContent = '';
    console.log(id)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showCurrentProduct(data.meals[0]))
}
// show details
const showCurrentProduct = product => {
    console.log(product)
    const showItem = document.getElementById('details');
    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = `
        <div class="card">
                 <img src="${product.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                     <h5 class="card-title">${product.strMeal}</h5>
                    <P>${product.strInstructions}</p>
                    <button class="bg-warning rounded"><a href="${product.strYoutube}">See on youtube</a></button>
                </div>
        </div>
        `
    showItem.appendChild(div);
}
loadMealByCategories();