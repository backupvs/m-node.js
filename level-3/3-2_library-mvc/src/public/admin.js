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

/* Image input */

const image = document.getElementById("imgPreview"); // Image
const imgInput = document.getElementById("imgInput"); // File input for image
const clearImg = document.getElementById("clearImg"); // Button to clear preview and input

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