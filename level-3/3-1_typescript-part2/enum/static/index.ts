const plusBtn = document.getElementById("btn-plus");
const minusBtn = document.getElementById("btn-minus");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

enum Button {
    Plus,
    Minus
}

plusBtn?.addEventListener("click", () => {
    fetch("http://localhost:3000/plus", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ btn: Button.Plus })
    }).then(res => {
        return res.json();
    }).then(data => {
        if (plus) {
            plus.innerHTML = `plus count: ${data.count}`;
        }
    });
})

minusBtn?.addEventListener("click", () => {
    fetch("http://localhost:3000/minus", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ btn: Button.Minus })
    }).then(res => {
        return res.json();
    }).then(data => {
        if (minus) {
            minus.innerHTML = `minus count: ${data.count}`;
        }
    });
})
