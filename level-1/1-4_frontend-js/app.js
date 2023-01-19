window.onload = function() {
    localStorageLabel.innerText = localStorage.getItem("localData");
    sessionStorageLabel.innerText = sessionStorage.getItem("sessionData");
    cookieLabel.innerHTML = getCookie("cookieData");

    document.body.style.overflow = "hidden";
};

/************************ Task 1, 2 ************************/

/* Elements */
const blackBox = document.getElementById("box-task1");
const btnDisplayNone = document.getElementById("btn-displayNone");
const btnRemove = document.getElementById("btn-remove");
const btnHide = document.getElementById("btn-hide-task1");

/* Event listeners for buttons */
btnDisplayNone.addEventListener("click", displayNone);
btnDisplayNone.addEventListener("click", toggleInnerHTML("display: none", "show"));

btnRemove.addEventListener("click", removeElement);
btnRemove.addEventListener("click", toggleInnerHTML("remove()", "refresh"));

btnHide.addEventListener("click", () => { blackBox.classList.toggle("hidden"); });
btnHide.addEventListener("click", toggleInnerHTML("hide", "reveal"));

/* Toggles "display: none" property */
function displayNone() {
    blackBox.style.display = blackBox.style.display === "none" ? "block" : "none";
}

/* Element.remove() */
function removeElement() {
    blackBox.remove();
    btnRemove.removeEventListener("click", removeElement);
    btnRemove.addEventListener("click", () => { location.reload() });
}

/************************ Task 3 ************************/

/* Elements */
const btnHide3 = document.getElementById("btn-hide-task3");
const blackBoxes = document.getElementsByClassName("black-box");

btnHide3.addEventListener("click", toggleInnerHTML("hide", "reveal"));

/* Add listeners to hide all black boxes */
for (let box of blackBoxes) {
    btnHide3.addEventListener("click", () => { box.classList.toggle("hidden"); });
}

/************************ Task 4 ************************/

/* Elements */
const inputTask4 = document.getElementById("input-task4");
const btnHide4 = document.getElementById("btn-hide-task4");

btnHide4.addEventListener("click", hideAll);
btnHide4.addEventListener("click", toggleInnerHTML("hide", "show"));

/* Hides all elements that match the given selector */
function hideAll() {
    let elements = document.querySelectorAll(inputTask4.value || null);

    for (let el of elements) {
        el.classList.toggle("hidden");
    }
}

/************************ Task 5 ************************/

const yellowBox = document.getElementById("yellow-box");
yellowBox.addEventListener("click", alertHello);

/* Alert "Hello" and change event listener */
function alertHello() {
    alert("Hello");
    yellowBox.innerHTML = "Click me again";
    this.removeEventListener("click", alertHello);
    this.addEventListener("click", hide);
}

function hide() { yellowBox.classList.add("hidden"); }

/************************ Task 6 ************************/

/* Elements */
const btnTask6 = document.getElementById("btn-hide-task6");
const redBox = document.getElementById("red-box");

btnTask6.addEventListener("mouseover", () => { redBox.classList.remove("hidden"); });
btnTask6.addEventListener("mouseout", () => { redBox.classList.add("hidden"); });

/************************ Task 7 ************************/

/* Elements */
const inputTask7 = document.getElementById("input-task7");
const greenRect = document.getElementById("green-rect");

inputTask7.addEventListener("focusin", () => { greenRect.style.display = "block"; });
inputTask7.addEventListener("input", () => { greenRect.style.display = "none"; })

/************************ Task 8 ************************/

/* Elements */
const btnTask8 = document.getElementById("btn-task8");
const image = document.querySelector("#task8 img");
const inputImage = document.getElementById("input-task8");

btnTask8.addEventListener("click", () => image.src = inputImage.value);

/************************ Task 9 ************************/

/* Elements */
const btnTask9 = document.getElementById("btn-task9");
const textAreaTask9 = document.getElementById("textarea-task9");
let containerImages = document.getElementById("container-images");

btnTask9.addEventListener("click", showImages);

/* Parses input text with links and
 * creates placeholders and images and append it to container 
 */
function showImages() {
    let invalidSrc = false;
    if (!textAreaTask9.value) {
        clearImages();
        return;
    }

    /* Create new empty container for images */
    clearImages();

    textAreaTask9.value.split("\n").forEach((link) => {
        if (!link) return;

        /* Create placeholder for img */
        let newImagePlaceholder = document.createElement("div");
        newImagePlaceholder.classList.add("img-placeholder");

        /* Create img */
        let newImage = document.createElement("img");
        newImage.src = link;
        newImagePlaceholder.appendChild(newImage);

        /* Event listener on img errors */
        newImage.addEventListener("error", () => {
            invalidSrc = true;
            newImagePlaceholder.remove();
        });

        if (!invalidSrc) {
            containerImages.appendChild(newImagePlaceholder);
        }
    });

}

/* Create new empty container for images */
function clearImages() {
    containerImages.remove();
    containerImages = document.createElement("div");
    containerImages.id = "container-images";
    containerImages.classList.add("container-row");
    document.querySelector("#task9 > .container-col").insertBefore(containerImages, textAreaTask9);
}

/************************ Task 10 ************************/

const mouseCoordTracker = document.getElementById("mouse-coord-tracker");

document.addEventListener("mousemove", (e) => { mouseCoordTracker.innerHTML = `X: ${e.pageX}, Y: ${e.pageY}` });

/************************ Task 11 ************************/

const browserLangLabel = document.getElementById("browser-lang");
browserLangLabel.innerHTML = `Language: ${navigator.language}`;

/************************ Task 12 ************************/

// const geolocationLabel = document.getElementById("geolocation");
// navigator.geolocation.getCurrentPosition( (pos) => {
//     geolocationLabel.innerHTML = `Ш: ${pos.coords.latitude}, Д: ${pos.coords.longitude}`
// });

/************************ Task 13 ************************/

/* Elements */
const localStorageLabel = document.getElementById("local-input");
const sessionStorageLabel = document.getElementById("session-input");
const cookieLabel = document.getElementById("cookie-input");

localStorageLabel.addEventListener("input", () => { localStorage.setItem("localData", localStorageLabel.innerText); });
sessionStorageLabel.addEventListener("input", () => { sessionStorage.setItem("sessionData", sessionStorageLabel.innerText); });

/* Chrome doesn't allow cookies in local files */
cookieLabel.addEventListener("input", () => { setCookie("cookieData", cookieLabel.innerHTML) });

/* Sets cookie value by attribute name */
function setCookie(cname, cvalue) {
    document.cookie = `${cname}=${cvalue}; SameSite=None; Secure`;
}

/* Gets cookie value by attribute name */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let attributes = decodedCookie.split(";");

    for (let attribute of attributes) {
        while (attribute.charAt(0) === " ") {
            attribute = attribute.substring(1);
        }
        if (attribute.indexOf(name) === 0) {
            return attribute.substring(name.length, attribute.length);
        }
    }

    return "";
}

/************************ Task 14 ************************/

const btnTop = document.getElementById("btn-gotop");

window.onscroll = () => { showButton() };

/* Show button when user scrolled down 20px from the top of the document */
function showButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
}

/* Go back to top on click */
btnTop.addEventListener("click", () => { window.scrollTo({top: 0, behavior: "smooth"}); });

/************************ Task 15 ************************/

const boxOuter = document.getElementById("box-outer");
const boxInner = document.getElementById("box-inner");

boxOuter.addEventListener("click", (e) => { alert("outer") });
boxInner.addEventListener("click", (e) => {
    alert("inner");
    e.stopPropagation();
});

/************************ Task 16 ************************/

const pageBlock = document.getElementById("pageblock");

pageBlock.addEventListener("click", () => {
    document.body.style.overflow = "visible";
    pageBlock.style.display = "none";
});

/************************ Task 17 ************************/

const fromTask17 = document.getElementById("form-task17");

fromTask17.addEventListener("submit", (e) => { e.preventDefault() });

/************************ Task 18 ************************/

/* Elements */
const dragAndDrop = document.querySelector(".drag-n-drop");
const fileInput = document.getElementById("input-file");

/* Functions for event listeners */
const active = () => { dragAndDrop.classList.add("file-over") };
const inactive = () => { dragAndDrop.classList.remove("file-over") };
const prevents = (e) => { e.preventDefault() };

/* Prevent default browser behaviour of drag and drop events */
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dragAndDrop.addEventListener(eventName, prevents);
});

/* Event listeners */
["dragenter", "dragover"].forEach((eventName) => {
    dragAndDrop.addEventListener(eventName, active);
});
["dragleave", "drop"].forEach((eventName) => {
    dragAndDrop.addEventListener(eventName, inactive);
});

fileInput.addEventListener("change", () => {
    console.log(fileInput.files.length);
    if (fileInput.files.length > 0) {
        dragAndDrop.classList.add("file-selected");
    } else {
        dragAndDrop.classList.remove("file-selected");
    }
});

dragAndDrop.addEventListener("drop", (e) => {
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event("change"));
});
/* Misc functions */

/* Toggles innerHTML */
function toggleInnerHTML(text1, text2) {
    return function () {
        this.innerHTML = this.innerHTML === text1 ? text2 : text1;
    }
}