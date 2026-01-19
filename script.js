const button = document.querySelector("button");

button.addEventListener("click", () => {
  const priceElements = document.querySelectorAll(".prices");
  let totalPrice = 0;

  priceElements.forEach(price => {
    totalPrice += Number(price.textContent);
  });

  document.getElementById("ans").textContent = totalPrice;
});
