const postBookForm = document.getElementById("postBookForm"); // Form to add a book
const image = document.getElementById("imgPreview"); // Input image preview
const imgInput = document.getElementById("imgInput"); // File input for image
const clearImg = document.getElementById("clearImg"); // Button to clear preview and input

imgInput.addEventListener("change", handleImageSelection);
clearImg.addEventListener("click", clearImagePlace);
postBookForm.addEventListener("submit", handleBookFormSubmit);

/******************************** Image input ********************************/

// Show image preview when selected
function handleImageSelection(event) {
    const [file] = imgInput.files;
    if (file) {
        image.src = URL.createObjectURL(file);
        clearImg.style.visibility = "visible"
    }
}

// Clear preview and file input
function clearImagePlace() {
    clearImg.style.visibility = "hidden"
    image.src = "";
    imgInput.value = "";
}

/******************************** Books operations ********************************/

// Submit a book adding form
async function handleBookFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(postBookForm);
    const authors = new Array(5).fill(undefined).map((a, i) => formData.get(`author${i + 1}`));

    formData.append("authors", JSON.stringify(authors));

    const response = await fetch("http://localhost:3000/books/add", { method: "POST", body: formData });
    const jsonResponse = await response.json();
    jsonResponse.ok ? alert("Книгу успішно додано") : alert("Книгу не було додано");
    window.location.reload();
}

// Delete book by id
async function deleteBook(id) {
    const response = await fetch(`http://localhost:3000/books/delete?id=${id}`, { method: "DELETE" })
    const jsonResponse = await response.json();
    jsonResponse.ok ? alert("Книгу успішно видалено") : alert("Книгу не було видалено");
    window.location.reload();
}

/* Fetch admin page with bad credentials to log out
 * and redirect to home page.
 */
function logout() {
    if (navigator.userAgent.match(/firefox|fxios/i)) {
        window.location.href = "http://logout:logout@localhost:3000/admin";
    } else {
        fetch("http://localhost:3000/admin", {
            headers: {
                "Authorization": "Basic _"
            }
        });
    }
    window.location.href = "/";
}