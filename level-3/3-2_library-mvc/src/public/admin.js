const postBookForm = document.getElementById("postBookForm"); // Form to add a book
const image = document.getElementById("imgPreview"); // Input image preview
const imgInput = document.getElementById("imgInput"); // File input for image
const clearImg = document.getElementById("clearImg"); // Button to clear preview and input

/******************************** Image input ********************************/

const showClearImgIcon = () => clearImg.style.visibility = "visible";
const hideClearImgIcon = () => clearImg.style.visibility = "hidden";

// Show image preview when selected
imgInput.onchange = (event) => {
    const [file] = imgInput.files;
    if (file) {
        image.src = URL.createObjectURL(file);
        showClearImgIcon();
    }
}

// Clear preview and file input
function clearImgPlace() {
    hideClearImgIcon();
    image.src = "";
    imgInput.value = "";
}


/******************************** Books operations ********************************/

// Submit a book adding form
postBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(postBookForm);

    try {
        const response = await fetch("http://localhost:3000/books/add", { method: "POST", body: formData })
        const jsonResponse = await response.json();
        jsonResponse.ok ? notifySuccess("Книгу успішно додано") : notifyFailure("Книгу не було додано");
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
});

// Delete book by id
async function deleteBook(id) {
    try {
        const response = await fetch(`http://localhost:3000/books/delete?id=${id}`, { method: "DELETE" })
        const jsonResponse = await response.json();
        jsonResponse.ok ? notifySuccess("Книгу успішно видалено") : notifyFailure("Книгу не було видалено");
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

/******************************** Notification ********************************/

function notifySuccess(text) {
    alert(text);
}

function notifyFailure(text) {
    alert(text);
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