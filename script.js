// Grocery List Total Price Calculator
class GroceryCalculator {
    constructor() {
        this.table = null;
        this.totalRowId = 'total-price-row';
    }

    // Initialize the calculator when DOM is loaded
    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.calculateAndDisplayTotal());
        } else {
            this.calculateAndDisplayTotal();
        }
    }

    // Extract all prices from the table using querySelectorAll
    extractPrices() {
        const priceElements = document.querySelectorAll('.prices');
        const prices = [];
        
        priceElements.forEach(element => {
            // Remove currency symbols and parse as float
            const priceText = element.textContent.trim();
            const numericPrice = parseFloat(priceText.replace(/[$£€,]/g, ''));
            
            // Only add valid numbers
            if (!isNaN(numericPrice)) {
                prices.push(numericPrice);
            }
        });
        
        return prices;
    }

    // Calculate the sum of all prices
    calculateTotal(prices) {
        return prices.reduce((total, price) => total + price, 0);
    }

    // Create and append total row to the table
    createTotalRow(total) {
        // Find the table (assumes there's a table with price elements)
        const priceElements = document.querySelectorAll('.prices');
        if (priceElements.length === 0) {
            console.warn('No price elements found with class "prices"');
            return null;
        }

        // Find the table by traversing up from the first price element
        let table = priceElements[0].closest('table');
        if (!table) {
            console.warn('No table found containing price elements');
            return null;
        }

        this.table = table;

        // Remove existing total row if it exists
        const existingTotalRow = document.getElementById(this.totalRowId);
        if (existingTotalRow) {
            existingTotalRow.remove();
        }

        // Create new total row
        const totalRow = document.createElement('tr');
        totalRow.id = this.totalRowId;
        totalRow.style.fontWeight = 'bold';
        totalRow.style.backgroundColor = '#f0f0f0';

        // Create single cell that spans all columns
        const totalCell = document.createElement('td');
        const tableColumns = table.rows[0] ? table.rows[0].cells.length : 2;
        totalCell.colSpan = tableColumns;
        totalCell.textContent = `Total: $${total.toFixed(2)}`;
        totalCell.style.textAlign = 'right';
        totalCell.style.padding = '10px';

        totalRow.appendChild(totalCell);

        // Append to table body or table if no tbody exists
        const tbody = table.querySelector('tbody');
        if (tbody) {
            tbody.appendChild(totalRow);
        } else {
            table.appendChild(totalRow);
        }

        return totalRow;
    }

    // Main function to calculate and display total
    calculateAndDisplayTotal() {
        try {
            // Extract prices from the table
            const prices = this.extractPrices();
            
            if (prices.length === 0) {
                console.warn('No valid prices found to calculate total');
                return;
            }

            // Calculate total
            const total = this.calculateTotal(prices);

            // Create and display total row
            this.createTotalRow(total);

            console.log(`Calculated total: $${total.toFixed(2)} from ${prices.length} items`);

        } catch (error) {
            console.error('Error calculating total:', error);
        }
    }

    // Method to recalculate when prices change
    refresh() {
        this.calculateAndDisplayTotal();
    }

    // Set up automatic refresh when table content changes
    enableAutoRefresh() {
        if (!this.table) {
            // Try to find table first
            const priceElements = document.querySelectorAll('.prices');
            if (priceElements.length > 0) {
                this.table = priceElements[0].closest('table');
            }
        }

        if (this.table) {
            // Use MutationObserver to watch for changes in the table
            const observer = new MutationObserver((mutations) => {
                let shouldRefresh = false;
                
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        shouldRefresh = true;
                    }
                });

                if (shouldRefresh) {
                    // Debounce the refresh to avoid excessive calculations
                    clearTimeout(this.refreshTimeout);
                    this.refreshTimeout = setTimeout(() => {
                        this.calculateAndDisplayTotal();
                    }, 100);
                }
            });

            observer.observe(this.table, {
                childList: true,
                subtree: true,
                characterData: true
            });

            console.log('Auto-refresh enabled for grocery table');
        }
    }
}

// Create global instance
const groceryCalculator = new GroceryCalculator();

// Initialize when DOM is ready
groceryCalculator.init();

// Optional: Enable auto-refresh for dynamic updates
// Uncomment the next line if you want automatic recalculation when table changes
// groceryCalculator.enableAutoRefresh();

// Export for manual use
window.groceryCalculator = groceryCalculator;

// Alternative simple function approach (if you prefer a simpler implementation)
function calculateGroceryTotal() {
    // Get all price elements
    const prices = document.querySelectorAll('.prices');
    let total = 0;

    // Sum all prices
    prices.forEach(priceElement => {
        const priceText = priceElement.textContent.trim();
        const price = parseFloat(priceText.replace(/[$£€,]/g, ''));
        if (!isNaN(price)) {
            total += price;
        }
    });

    // Find table and create total row
    if (prices.length > 0) {
        const table = prices[0].closest('table');
        if (table) {
            // Remove existing total row
            const existingTotal = table.querySelector('#simple-total');
            if (existingTotal) {
                existingTotal.remove();
            }

            // Create new total row
            const totalRow = document.createElement('tr');
            totalRow.id = 'simple-total';
            const totalCell = document.createElement('td');
            totalCell.colSpan = table.rows[0] ? table.rows[0].cells.length : 2;
            totalCell.textContent = `Total: $${total.toFixed(2)}`;
            totalCell.style.textAlign = 'right';
            totalCell.style.fontWeight = 'bold';
            totalRow.appendChild(totalCell);

            const tbody = table.querySelector('tbody') || table;
            tbody.appendChild(totalRow);
        }
    }

    return total;
}

// Make simple function available globally
window.calculateGroceryTotal = calculateGroceryTotal;
