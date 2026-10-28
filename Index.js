// Element selectors in HTML
const titleElements = document.getElementsByClassName("title");
const paragraphElement = document.getElementById("para");
const tagElement = document.querySelector("h1");
const classElement = document.querySelector(".title");
const idElement = document.querySelector("#para");


const allTagElements = document.querySelectorAll("h1");
const allClassElements = document.querySelectorAll(".title");
const allIdElements = document.querySelectorAll("#para");


const headingElements = document.getElementsByTagName("h1");


const cssTagElement = document.querySelector(".title span a");
const cssIdElement = document.querySelector("#para a");


const htmlCollection = document.forms[0]
  ? document.forms[0].elements
  : null;


if (titleElements.length > 0) {
  titleElements[0].firstChild.textContent = "A Login Form ";
  titleElements[0].style.cssText =
    "color: red; font-size: 30px; text-align: center; padding: 10px; border-radius: 10px;";
}

const paragraphs = document.getElementsByTagName("p");
if (paragraphs.length > 0) {
  paragraphs[0].textContent = paragraphs[0].textContent.toUpperCase();
}


const newElement = document.createElement("div");
newElement.innerHTML = `
  <div class="card" style="border: 1px solid #ccc; padding: 20px; margin: 20px; border-radius: 10px;">
    <h2>New Element</h2>
    <p>This is a new element added to the DOM.</p>
  </div>
`;
document.body.appendChild(newElement);


const removeElement = document.getElementById("form");



let productsElement = document.getElementById("products");
if (!productsElement) {
  productsElement = document.createElement("section");
  productsElement.id = "products";
  document.body.appendChild(productsElement);
}
productsElement.setAttribute("aria-live", "polite");

function displayProducts(productsData) {
  const items = Array.isArray(productsData)
    ? productsData
    : productsData && Array.isArray(productsData.products)
      ? productsData.products
      : [];
  const validItems = items.filter(
    (product) => product && typeof product === "object",
  );

  productsElement.replaceChildren();

  if (validItems.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No products found.";
    productsElement.appendChild(message);
    return;
  }

  validItems.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "image";

    if (product.thumbnail) {
      const image = document.createElement("img");
      image.className = "product-image";
      image.src = product.thumbnail;
      image.alt = product.title || "Product image";
      imageContainer.appendChild(image);
    }

    const heading = document.createElement("h2");
    heading.className = "product-title";
    heading.textContent = product.title || "Untitled product";

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description || "";

    const price = document.createElement("p");
    price.className = "product-price";
    if (typeof product.price === "number") {
      price.textContent = `$${product.price.toFixed(2)}`;
    }

    card.append(imageContainer, heading, description, price);
    productsElement.appendChild(card);
  });
}

async function loadProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    displayProducts(await response.json());
  } catch (error) {
    const message = document.createElement("p");
    message.textContent = "Could not load products. Please try again.";
    productsElement.replaceChildren(message);
    console.error("Error loading products:", error);
  }
}

loadProducts();
