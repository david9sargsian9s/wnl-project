const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
    localStorage.setItem('accessToken', token);
    window.history.replaceState({}, document.title, "/");
}

document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.querySelector(".quote-container p");
    const textToType = quoteElement.textContent;
    quoteElement.textContent = ""; 
    
    let index = 0;
    const speed = 50; 

    function typeWriter() {
        if (index < textToType.length) {
            quoteElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});