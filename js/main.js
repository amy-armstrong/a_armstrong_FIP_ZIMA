console.log("javascript file is running");

// ------------------- VARIABLES -------------------
// I’m grabbing the age popup and buttons (homepage only)
const agePopup = document.querySelector("#agePopup");
const yesButton = document.querySelector(".yes-btn");
const noButton = document.querySelector(".no-btn");

// I’m grabbing carousel items and arrows
const carouselItems = document.querySelectorAll(".carousel-container .carousel-item");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
let currentCarouselIndex = 0;

// I’m grabbing the contact form and storing field info
const contactForm = document.querySelector("form");
const formFields = [
  { selector: 'input[type="text"]', name: "Name" },
  { selector: 'input[type="email"]', name: "Email" },
  { selector: "textarea", name: "Message" }
];

// ------------------- FUNCTIONS -------------------

// I hide the popup when the user clicks Yes
function handleAgeYes() {
  agePopup.style.display = "none";
}

// I redirect the user when they click No
function handleAgeNo() {
  window.location.href = "https://www.google.com";
}

// I show only one carousel item at a time
function showCarouselItem(index) {
  carouselItems.forEach((item, i) => {
    item.classList.toggle("hidden", i !== index);
  });
}

// I move the carousel backwards
function showPreviousItem() {
  currentCarouselIndex = (currentCarouselIndex - 1 + carouselItems.length) % carouselItems.length;
  showCarouselItem(currentCarouselIndex);
}

// I move the carousel forwards
function showNextItem() {
  currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
  showCarouselItem(currentCarouselIndex);
}

// I check if the email has a valid format (no regex)
function isValidEmail(email) {
  const atIndex = email.indexOf("@");
  if (atIndex < 1) return false; // no @ or @ is first character

  const dotIndex = email.indexOf(".", atIndex);
  if (dotIndex <= atIndex + 1) return false; // no dot or dot right after @

  if (dotIndex === email.length - 1) return false; // dot is last character

  return true;
}

// I validate all form fields before submitting
function handleFormSubmit(event) {
  event.preventDefault();

  for (let i = 0; i < formFields.length; i++) {
    const fieldElement = contactForm.querySelector(formFields[i].selector);
    const value = fieldElement.value.trim();

    // I make sure the field is not empty
    if (!value) {
      alert(`Please enter your ${formFields[i].name}.`);
      return;
    }

    // I make sure the email looks correct
    if (formFields[i].name === "Email" && !isValidEmail(value)) {
      alert("Please enter a valid email address.");
      return;
    }
  }

  // I show a thank you message after successful submission
  const userName = contactForm.querySelector(formFields[0].selector).value.trim();
  contactForm.innerHTML = `
    <h2 class="text-center text-blue-700 text-xl font-bold">
      Thank you, ${userName}! Your message has been sent.
    </h2>
    <p class="text-center mt-4 text-gray-700">
      We will get back to you as soon as possible.
    </p>
  `;
}

// ------------------- EVENT LISTENERS -------------------

// I add popup listeners only if elements exist (homepage)
if (yesButton && noButton && agePopup) {
  yesButton.addEventListener("click", handleAgeYes);
  noButton.addEventListener("click", handleAgeNo);
}

// I add carousel listeners only if carousel exists
if (carouselItems.length > 0 && leftArrow && rightArrow) {
  leftArrow.addEventListener("click", showPreviousItem);
  rightArrow.addEventListener("click", showNextItem);
  showCarouselItem(currentCarouselIndex); // I initialize the carousel
}

// I add form listener only if form exists
if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);
}
