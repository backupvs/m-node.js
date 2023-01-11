function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}\n${headers}${body ? "\n" + body : ""}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode = $method === "POST"
        ? $uri === "/api/checkLoginAndPassword" && $headers["Content-Type"] === "application/x-www-form-urlencoded" 
            ? 200
            : 404
        : 400;

    try {
        readFile("passwords.txt");
    } catch(e) {
        statusCode = 500;
    }

    const statusMessage = getStatusMessage(statusCode);
    const body = statusCode === 200
        ? auth(getUsernameAndPassword($body))
            ? `<h1 style="color:green">FOUND</h1>`
            : `<h1 style="color:red">NOT FOUND</h1>`
        : "";
    
    const headers = `${new Date()}
Server: Apache/2.2.14 (Win32)
Content-Length: ${body.toString().length}
Connection: Closed
Content-Type: text/html; charset=utf-8`

    outputHttpResponse(statusCode, statusMessage, headers, body);
}

function auth(authData) {
    const data = readFile("passwords.txt");
    return data
        .split(/\r\n/)
        .reduce((result, entry, i, arr) => {
            if(entry === authData) arr.splice(1);
            return acc = entry === authData;
        });
}

function getUsernameAndPassword(body) {
    const username = body.match(/(?:login=)([\S]+)(?:&)/)[1];
    const password = body.match(/(?:password=)([\S]+)/)[1];
    return `${username}:${password}`;
}

function readFile(path) {
    return require("fs").readFileSync(path, {encoding: "utf-8", flag:"r"});
}

function getStatusMessage(statusCode) {
    switch (statusCode) {
        case 200: return "OK";
        case 400: return "Bad Request";
        case 404: return "Not Found";
        case 500: return "Internal Server Error"
        default: throw new Error("Wrong status code");
    }
}

function parseTcpStringAsHttpRequest(string) {
    return {
    method: string.match(/\w+/)[0],
    uri : string.match(/((\/\w+)+(\?(\w+)=[\d,]+)?(\.html)?)|(\/)/)[0],
    headers: Object.fromEntries(
        string
            .match(/([\w-]+:\s?.+)/g)
            .map( str => str.replace(" ", "").split(":"))
        ),
    body :string.match(/\n\s(.*)/)[1],
  };
}

/* Testing */

const contents = `POST /api/checkLoginAndPassword HTTP/1.1
Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0
Content-Length: 35

login=student&password=12345`;

http = parseTcpStringAsHttpRequest(contents);

console.log("\nRESPONSE ====================\n");
processHttpRequest(http.method, http.uri, http.headers, http.body);