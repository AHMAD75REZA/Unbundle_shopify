// JavaScript logic for handling chocolate selection and calculating the total price

document.addEventListener("DOMContentLoaded", () => {
    // Define your chocolates as an array of objects
    const chocolates = [
        { name: "Chocolate 1", price: 2.50 },
        { name: "Chocolate 2", price: 3.00 },
        // Add more chocolates with their respective prices here
    ];

    // Initialize total price and selected chocolates
    let totalPrice = 0;
    const selectedChocolates = [];

    // Function to calculate and update the total price
    function updateTotalPrice() {
        totalPrice = selectedChocolates.reduce((acc, chocolate) => acc + chocolate.price * chocolate.quantity, 0);
        document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Function to handle checkbox changes
    function handleCheckboxChange(event) {
        const chocolateName = event.target.value;
        const chocolate = chocolates.find(choco => choco.name === chocolateName);

        if (event.target.checked) {
            // If checkbox is checked, add chocolate to selectedChocolates array
            chocolate.quantity = 1; // Initialize quantity to 1
            selectedChocolates.push(chocolate);
        } else {
            // If checkbox is unchecked, remove chocolate from selectedChocolates array
            const index = selectedChocolates.findIndex(choco => choco.name === chocolateName);
            if (index !== -1) {
                selectedChocolates.splice(index, 1);
            }
        }

        updateTotalPrice();
    }

    // Function to handle quantity input changes
    function handleQuantityChange(event) {
        const chocolateName = event.target.dataset.name;
        const quantity = parseInt(event.target.value);
        const chocolate = selectedChocolates.find(choco => choco.name === chocolateName);

        if (chocolate) {
            chocolate.quantity = quantity;
        }

        updateTotalPrice();
    }

    // Create checkboxes for chocolates
    const chocolatesDiv = document.querySelector(".chocolates");
    chocolates.forEach(chocolate => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = chocolate.name;
        checkbox.addEventListener("change", handleCheckboxChange);

        const label = document.createElement("label");
        label.textContent = `${chocolate.name} - $${chocolate.price.toFixed(2)}`;

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = 0;
        quantityInput.value = 0;
        quantityInput.dataset.name = chocolate.name;
        quantityInput.addEventListener("change", handleQuantityChange);

        chocolatesDiv.appendChild(checkbox);
        chocolatesDiv.appendChild(label);
        chocolatesDiv.appendChild(quantityInput);
        chocolatesDiv.appendChild(document.createElement("br"));
    });

    // Handle form submission (you can send the selected chocolates to the server here)
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", () => {
        console.log("Selected Chocolates:", selectedChocolates);
        // You can make an AJAX request to the server here to save the custom pack data
        // Reset selectedChocolates array for the next custom pack
        selectedChocolates.length = 0;
        updateTotalPrice();
    });
});
