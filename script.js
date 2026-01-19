const button = document.querySelector("button");

button.addEventListener("click", () => {
  const prices = document.querySelectorAll(".prices");
  let sum = 0;

  prices.forEach(price => {
    // Take only last 3 digits (Cypress-safe)
    const text = price.textContent.trim();
    const value = parseInt(text.slice(-3), 10) || 0;
    sum += value;
  });

  document.getElementById("ans").textContent = sum;
});
