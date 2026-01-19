<script>
  // Step 1: Get all price elements
  const priceElements = document.querySelectorAll(".prices");

  let total = 0;

  // Step 2: Calculate the sum
  priceElements.forEach(price => {
    total += Number(price.textContent);
  });

  // Step 3: Create a new row
  const table = document.getElementById("grocery-table");
  const totalRow = document.createElement("tr");
  const totalCell = document.createElement("td");

  // Step 4: Style & content
  totalCell.colSpan = 2;
  totalCell.textContent = `Total Price: ₹${total}`;
  totalCell.style.fontWeight = "bold";
  totalCell.style.textAlign = "center";

  totalRow.appendChild(totalCell);
  table.appendChild(totalRow);
</script>
