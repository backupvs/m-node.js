function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}\n${headers} ${body ? "\n" + body : ""}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
    const statusCode = $method === "GET" ? $uri.startsWith("/sum") ? 200 : 404 : 400;
    const statusMessage = getStatusMessage(statusCode);
    const body = (statusCode === 200) && /\?nums=[\d,]+/g.test($uri)
        ? sum($uri.match(/(?:nums=)([\d,]+)/)[1].split(",").map(num => +num))
        : "";
    const headers = `${new Date()}
Server: Apache/2.2.14 (Win32)
Content-Length: ${body.toString().length}
Connection: Closed
Content-Type: text/html; charset=utf-8`

    outputHttpResponse(statusCode, statusMessage, headers, body);
}

const sum = (nums) => nums.reduce((total, num) => total += num);

function getStatusMessage(statusCode) {
    switch (statusCode) {
        case 200: return "OK";
        case 400: return "Bad Request";
        case 404: return "Not Found";
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
const contents = `GET /sum?nums=1,2,3,8,10 HTTP/1.1
Host: student.shpp.me

`;

http = parseTcpStringAsHttpRequest(contents);

console.log("==================== REQUEST ====================\n");
console.log(JSON.stringify(http, undefined, 2));
console.log("\n==================== RESPONSE ====================\n");
processHttpRequest(http.method, http.uri, http.headers, http.body);