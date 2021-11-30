const form = document.querySelector("#form");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const password1 = document.querySelector("#password1");
const password2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const showHideIcons = document.querySelectorAll(".far");
const fieldsArray = document.querySelectorAll(".form-control");

// ==========
//  Functions
// ==========

// Show error message
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = "form-control error";

	const msg = formControl.querySelector("p");
	msg.innerText = message;
};

// Show success outline
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
};

// Check required fields
const checkRequired = (inputArray) => {
	inputArray.forEach((input) => {
		if (input.value.trim() === "") {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
};

// Check phone number
const validatePhone = (input, min, max) => {
	// 1) can start with +
	// 2) only numbers and space
	// 3) min 7 chars, max 20
	const phoneRegex = /^\+?[0-9\s]{7,20}$/;
	if (phoneRegex.test(input.value)) {
		showSuccess(input);
	} else if (!phoneRegex.test(input.value) && input.value.length > min && input.value.length < max) {
		showError(input, `Can start with '+'. Only numbers and space afterwards.`);
	}
};

// Check email
const validateEmail = (input) => {
	// 1) only one @
	// 2) before @ 2-15 chars (nums or letters and ._$%&)
	// 3) after @ 2-55 chars (letters)
	const emailRegEx = /^[a-z?=._$%&0-9]{2,25}@[a-z?=.]{2,55}$/;

	if (emailRegEx.test(input.value.trim())) {
		showSuccess(input);
	} else if (!emailRegEx.test(input.value.trim()) && input.value.trim() !== "") {
		showError(input, `Email is not valid.`);
	}
};

// Check password
const validatePassword = (input, min, max) => {
	// 1) at least 1 uppercase
	// 2) at least one number
	// 3) at least one special char
	// 4) min 8 chars max 45

	const pwdRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@€£#$%^&*-_~?<>])[a-zA-Z0-9!@€£#$%^&*-_~?<>]{8,45}$/;

	if (pwdRegex.test(input.value.trim())) {
		showSuccess(input);
	} else if (!pwdRegex.test(input.value.trim()) && input.value.length > min && input.value.length < max) {
		showError(input, `Must have: uppercase, number, special character.`);
	}
};

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
	if (input1.value !== input2.value) {
		showError(input2, "Passwords do not match");
	}
};

// Get input field name
const getFieldName = (input) => input.placeholder;

// Check input length
const checkInputLength = (input, min, max) => {
	if (input.value.length < min && input.value.length > 0) {
		showError(input, `${getFieldName(input)} must be at least ${min} characters long`);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)} must not be more than ${max} characters long`);
	}
};

//  Check valid input fields
const isValidated = (formControlsArr) => {
	let counter = 0;

	formControlsArr.forEach((field) => {
		if (field.className === "form-control success") {
			counter++;
			console.log(counter);
		}
	});
	if (counter === formControlsArr.length) {
		alert("Thank you! You've just completed the form!");
	}
};

// ==========
//  Event Listeners
// ==========

form.addEventListener("submit", (e) => {
	e.preventDefault();

	checkRequired([firstname, lastname, email, phone, password1, password2]);
	checkInputLength(firstname, 2, 15);
	checkInputLength(lastname, 2, 15);
	checkInputLength(phone, 7, 20);
	checkInputLength(password1, 7, 45);
	validateEmail(email);
	validatePhone(phone, 7, 20);
	validatePassword(password1, 7, 45);
	checkPasswordsMatch(password1, password2);

	setTimeout(() => {
		isValidated(fieldsArray);
	}, 300);
});

showHideIcons.forEach((icon) =>
	icon.addEventListener("click", () => {
		const inputEl = icon.parentElement.querySelector("input");

		icon.className === "far fa-eye" ? (icon.className = "far fa-eye-slash") : (icon.className = "far fa-eye");

		inputEl.type === "text" ? (inputEl.type = "password") : (inputEl.type = "text");
	}),
);
