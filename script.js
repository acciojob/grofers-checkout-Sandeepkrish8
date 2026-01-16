const getSumBtn = document.createElement("button");
getSumBtn.textContent = "Get Total Price";
document.body.appendChild(getSumBtn);

const getSum = () => {
  const prices = document.querySelectorAll(".price");
  let total = 0;

  prices.forEach(price => {
    total += Number(price.textContent);
  });

  const table = document.querySelector("table");

  if (document.getElementById("total-row")) return;

  const row = document.createElement("tr");
  row.id = "total-row";

  const cell = document.createElement("td");
  cell.colSpan = 2;
  cell.textContent = `Total Price: ${total}`;

  row.appendChild(cell);
  table.appendChild(row);
};

getSumBtn.addEventListener("click", getSum);
