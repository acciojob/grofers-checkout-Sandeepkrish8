const getSum = () => {
  const prices = document.querySelectorAll(".price");
  let total = 0;

  prices.forEach(price => {
    total += Number(price.textContent);
  });

  const table = document.querySelector("table");

  // Prevent adding total row multiple times
  if (document.getElementById("total-row")) return;

  const totalRow = document.createElement("tr");
  totalRow.id = "total-row";

  const totalCell = document.createElement("td");
  totalCell.colSpan = 2;
  totalCell.textContent = `Total Price: ${total}`;

  totalRow.appendChild(totalCell);
  table.appendChild(totalRow);
};
