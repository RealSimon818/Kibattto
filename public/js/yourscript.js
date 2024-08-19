const titleText = "Get in Touch With Us!";
const descriptionText = "Join us in making a difference in the lives of children in need. ";

let titleIndex = 0;
let descriptionIndex = 0;

function typeEffect(element, text, index, callback) {
if (index < text.length) {
element.innerHTML += text.charAt(index);
index++;
setTimeout(() => typeEffect(element, text, index, callback), 100);
} else if (callback) {
setTimeout(callback, 1000);
}
}

document.addEventListener('DOMContentLoaded', () => {
const titleElement = document.getElementById('title');
const descriptionElement = document.getElementById('description');

typeEffect(titleElement, titleText, 0, () => {
typeEffect(descriptionElement, descriptionText, 0);
});
});


