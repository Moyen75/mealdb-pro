// load food by name 

const loadFood = () => {
    document.getElementById('show-alert').textContent = '';
    document.getElementById('show-products').textContent = '';
    const searchResultTex = document.getElementById('search-input').value;

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchResultTex}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.meals))

}
const showData = data => {
    if (data === null) {
        const searchResultTex = document.getElementById('search-input').value;
        const showSameCategoryProduct = document.getElementById('show-alert');
        showSameCategoryProduct.innerHTML = `
        <p class="alert-para">you entered ${searchResultTex} .please ! provide a valid name </p>
        `
        document.getElementById('search-input').value = '';
        return;
    }
    document.getElementById('search-input').value = '';
    const showSameCategoryProduct = document.getElementById('show-products');
    data.forEach(category => {
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