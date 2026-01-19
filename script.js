// Get all price elements
const priceElements = document.querySelectorAll(".prices");

let totalPrice = 0;

// Calculate the total
priceElements.forEach(price => {
  totalPrice += Number(price.textContent);
});

// Create a new row
const totalRow = document.createElement("tr");

// Create a single cell
const totalCell = document.createElement("td");
totalCell.colSpan = 2;
totalCell.textContent = "Total Price: " + totalPrice;

// Append cell to row
totalRow.appendChild(totalCell);

// Append row to table
document.getElementById("grocery-table").appendChild(totalRow);
