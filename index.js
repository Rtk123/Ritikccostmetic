





document.addEventListener("DOMContentLoaded", async () => {
    
    const container = document.getElementById("products-container");

    // Fetching dummy products
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    const products = data.products;

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <textarea placeholder="Write a review..."></textarea>
            <button class="review-btn">Submit Review</button>
            <div class="reviews"></div>
        `;

        const reviewContainer = productCard.querySelector(".reviews");

        // Load reviews from local storage
        let storedReviews = JSON.parse(localStorage.getItem(product.title)) || [];
        storedReviews.forEach(reviewText => {
            const reviewDiv = document.createElement("p");
            reviewDiv.innerText = reviewText;
            reviewContainer.appendChild(reviewDiv);
        });

        // Submit review and store in local storage
        productCard.querySelector(".review-btn").addEventListener("click", () => {
            const reviewText = productCard.querySelector("textarea").value;
            if (reviewText) {
                let reviews = JSON.parse(localStorage.getItem(product.title)) || [];
                reviews.push(reviewText);
                localStorage.setItem(product.title, JSON.stringify(reviews));

                const reviewDiv = document.createElement("p");
                reviewDiv.innerText = reviewText;
                reviewContainer.appendChild(reviewDiv);
            }
        });

        container.appendChild(productCard);
    });
});
