import http from "http";

const postMsg = {
    data: "Hello from client"
};

const options = {
    host: "127.0.0.1",
    port: 2000,
    path: "/",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(postMsg))
    }
};

const req = http.request(options, res => {
    let reqTime = Date.now();

    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => { rawData += chunk; });

    res.on("end", () => {
        const parsedData = JSON.parse(rawData);
        console.log(
            `Received "${parsedData.data}: ` +
            `${parsedData.data === postMsg.data ? "EQUAL" : "NOT EQUAL"}`
        );
        console.log(`Time spent on sending and receiving message: ${Date.now() - reqTime}ms`);
    });
});

req.write(JSON.stringify(postMsg));
req.end();