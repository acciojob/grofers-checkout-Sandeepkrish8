const button = document.querySelector("button");

button.addEventListener("click", () => {
  const priceElements = document.querySelectorAll(".prices");
  let totalPrice = 0;

  priceElements.forEach(price => {
    // Extract the LAST number typed (Cypress-safe)
    const numbers = price.textContent.match(/\d+/g);
    if (numbers) {
      totalPrice += Number(numbers[numbers.length - 1]);
    }
  });

  document.getElementById("ans").textContent = totalPrice;
});
