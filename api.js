// A synchronous function or operation

// async function () {
//   await
// }

// Results are returned as promises.

// setTimeout(() => {
//   console.log("I am a callback function");
// }, 5000);
// console.log("I am a synchronous function");

async function getPosts() {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
}

getPosts().catch((error) => {
  console.error("Error fetching products:", error);
});

// .then() and .catch() method
function fetchData() {
  fetch("https://dummyjson.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// try and catch method
async function fetchDataWithTryCatch() {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
