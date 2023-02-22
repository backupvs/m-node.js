window.onload = () => increaseCounter("view");

function increaseCounter(counter) {
    fetch("http://localhost:3000/books/<%= book.id %>", {
        method: "PATCH",
        body: JSON.stringify({ counter }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}