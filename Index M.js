const productsElement = document.getElementById("products");

function showProductsMessage(message) {
  const paragraph = document.createElement("p");
  paragraph.className = "products-message";
  paragraph.textContent = message;
  productsElement.replaceChildren(paragraph);
}

function displayProducts(products) {
  productsElement.replaceChildren();

  if (!products.length) {
    showProductsMessage("No products found.");
    return;
  }

  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imagePanel = document.createElement("div");
    imagePanel.className = "product-image-panel";

    if (product.thumbnail) {
      const image = document.createElement("img");
      image.className = "product-image";
      image.src = product.thumbnail;
      image.alt = product.title
        ? `${product.title} product image`
        : "Product image";
      image.loading = "lazy";
      imagePanel.appendChild(image);
    } else {
      const imagePlaceholder = document.createElement("span");
      imagePlaceholder.className = "product-image-placeholder";
      imagePlaceholder.textContent = "No image";
      imagePanel.appendChild(imagePlaceholder);
    }

    const content = document.createElement("div");
    content.className = "product-content";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category || "Featured";

    const title = document.createElement("h2");
    title.className = "product-title";
    title.textContent = product.title || "Untitled product";

    const rating = document.createElement("p");
    rating.className = "product-rating";
    if (typeof product.rating === "number") {
      const roundedRating = Math.max(0, Math.min(5, product.rating));
      rating.setAttribute("aria-label", `Rated ${roundedRating.toFixed(1)} out of 5`);
      rating.textContent = `${"\u2605".repeat(Math.round(roundedRating))}${"\u2606".repeat(5 - Math.round(roundedRating))} ${roundedRating.toFixed(1)}`;
    } else {
      rating.textContent = "Not yet rated";
    }

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description || "No description available.";

    content.append(category, title, rating, description);

    const purchasePanel = document.createElement("div");
    purchasePanel.className = "product-purchase";
    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent =
      typeof product.price === "number"
        ? `$${product.price.toFixed(2)}`
        : "Price unavailable";

    const availability = document.createElement("p");
    availability.className = "product-availability";
    availability.textContent = product.availabilityStatus || "Check availability";

    purchasePanel.append(price, availability);
    card.append(imagePanel, content, purchasePanel);
    fragment.appendChild(card);
  });

  productsElement.appendChild(fragment);
}

async function loadProducts() {
  showProductsMessage("Loading products...");

  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.products)) {
      throw new Error("The API response does not contain a products array.");
    }

    displayProducts(data.products);
  } catch (error) {
    console.error("Could not load products:", error);
    showProductsMessage("Could not load products. Check your connection and try again.");
  }
}

loadProducts();
