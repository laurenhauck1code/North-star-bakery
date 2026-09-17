// North Star Bakery - Touchstone 4 JavaScript

// Product data used to build the favorite-item menu.
const bakeryItems = [
    {
        id: "signature-loaf",
        name: "Signature Loaf",
        category: "Bread"
    },
    {
        id: "croissant",
        name: "Butter Croissant",
        category: "Pastry"
    },
    {
        id: "celebration-cake",
        name: "Celebration Cake",
        category: "Cake"
    }
];

// Object that stores the localStorage key in one place.
const storageKeys = {
    favoriteItem: "northStarBakeryFavorite"
};

// Object that stores reusable validation messages.
const validationMessages = {
    nameTooShort: "Name must be at least 2 characters.",
    invalidEmail: "Please enter a valid email address, such as name@example.com.",
    pickupRequired: "Please choose a preferred pickup date.",
    requestTypeRequired: "Please select a request type.",
    itemDetailsRequired: "Please enter item details.",
    itemDetailsTooShort: "Item details must be at least 5 characters."
};


// ------------------------------
// Favorite item feature
// ------------------------------

// Builds the Favorite Item dropdown from the bakeryItems array.
function populateFavoriteMenu() {
    const favoriteSelect = document.getElementById("favorite-item");

    if (!favoriteSelect) {
        return;
    }

    bakeryItems.forEach(function(item) {
        const option = document.createElement("option");

        option.value = item.id;
        option.textContent = item.name + " - " + item.category;

        favoriteSelect.appendChild(option);
    });
}


// Finds a bakery item object by its ID.
function findBakeryItem(itemId) {
    return bakeryItems.find(function(item) {
        return item.id === itemId;
    });
}


// Saves the selected favorite to localStorage.
function saveFavorite() {
    const favoriteSelect = document.getElementById("favorite-item");
    const favoriteStatus = document.getElementById("favorite-status");

    if (!favoriteSelect || !favoriteStatus) {
        return;
    }

    const selectedId = favoriteSelect.value;

    if (selectedId === "") {
        favoriteStatus.textContent =
            "Please choose a bakery item before saving your favorite.";
        return;
    }

    const selectedItem = findBakeryItem(selectedId);

    localStorage.setItem(
        storageKeys.favoriteItem,
        selectedId
    );

    favoriteStatus.textContent =
        selectedItem.name +
        " saved as your favorite. We will remember it on this browser.";
}


// Loads the saved favorite when the Products page opens or reloads.
function loadFavorite() {
    const favoriteSelect = document.getElementById("favorite-item");
    const favoriteStatus = document.getElementById("favorite-status");

    if (!favoriteSelect || !favoriteStatus) {
        return;
    }

    const savedId = localStorage.getItem(
        storageKeys.favoriteItem
    );

    if (!savedId) {
        return;
    }

    const savedItem = findBakeryItem(savedId);

    if (!savedItem) {
        return;
    }

    favoriteSelect.value = savedId;

    favoriteStatus.textContent =
        "Welcome back! Your saved favorite is " +
        savedItem.name +
        ". This choice was restored from localStorage.";
}


// Removes the saved favorite.
function clearFavorite() {
    const favoriteSelect = document.getElementById("favorite-item");
    const favoriteStatus = document.getElementById("favorite-status");

    if (!favoriteSelect || !favoriteStatus) {
        return;
    }

    localStorage.removeItem(
        storageKeys.favoriteItem
    );

    favoriteSelect.value = "";

    favoriteStatus.textContent =
        "Your saved favorite has been cleared.";
}


// Connects the favorite buttons to their functions.
function setupFavoriteFeature() {
    const saveButton = document.getElementById("save-favorite");
    const clearButton = document.getElementById("clear-favorite");

    if (!saveButton || !clearButton) {
        return;
    }

    saveButton.addEventListener("click", saveFavorite);
    clearButton.addEventListener("click", clearFavorite);

    populateFavoriteMenu();
    loadFavorite();
}


// ------------------------------
// Contact form validation
// ------------------------------

// Displays an error message near a field.
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(
        fieldId + "-error"
    );

    if (!field || !errorElement) {
        return;
    }

    field.classList.add("input-error");
    errorElement.textContent = message;
}


// Removes an error message from a field.
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(
        fieldId + "-error"
    );

    if (!field || !errorElement) {
        return;
    }

    field.classList.remove("input-error");
    errorElement.textContent = "";
}


// Checks whether the email has a basic valid format.
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// Validates the request form before submission.
function validateRequestForm(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const pickupDate = document.getElementById("pickup-date");
    const requestType = document.getElementById("request-type");
    const itemDetails = document.getElementById("item-details");
    const formStatus = document.getElementById("form-status");

    let formIsValid = true;

    clearError("name");
    clearError("email");
    clearError("pickup-date");
    clearError("request-type");
    clearError("item-details");

    formStatus.textContent = "";

    // Name validation
    if (name.value.trim().length < 2) {
        showError(
            "name",
            validationMessages.nameTooShort
        );

        formIsValid = false;
    }

    // Email validation
    if (!isValidEmail(email.value.trim())) {
        showError(
            "email",
            validationMessages.invalidEmail
        );

        formIsValid = false;
    }

    // Pickup date validation
    if (pickupDate.value === "") {
        showError(
            "pickup-date",
            validationMessages.pickupRequired
        );

        formIsValid = false;
    }

    // Request type validation
    if (requestType.value === "") {
        showError(
            "request-type",
            validationMessages.requestTypeRequired
        );

        formIsValid = false;
    }

    // Item details validation
    const itemText = itemDetails.value.trim();

    if (itemText === "") {
        showError(
            "item-details",
            validationMessages.itemDetailsRequired
        );

        formIsValid = false;
    } else if (itemText.length < 5) {
        showError(
            "item-details",
            validationMessages.itemDetailsTooShort
        );

        formIsValid = false;
    }

    if (!formIsValid) {
        formStatus.textContent =
            "Please correct the highlighted fields before submitting your request.";

        return;
    }

    formStatus.textContent =
        "Your request passed validation and is ready to be submitted.";
}


// Connects the form submit event to the validation function.
function setupRequestForm() {
    const requestForm = document.getElementById("request-form");

    if (!requestForm) {
        return;
    }

    requestForm.addEventListener(
        "submit",
        validateRequestForm
    );
}


// ------------------------------
// Page setup
// ------------------------------

// Runs the appropriate setup functions after the HTML loads.
document.addEventListener("DOMContentLoaded", function() {
    setupFavoriteFeature();
    setupRequestForm();
});
