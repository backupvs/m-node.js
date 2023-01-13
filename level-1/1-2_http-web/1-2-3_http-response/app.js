/**
 * Procces HTTP request and makes response depending on
 * method, uri, headers and body.
 * Prints response to the console.
 * 
 * @param {string} $method HTTP method
 * @param {string} $uri Request URI
 * @param {string} $headers Request headers
 * @param {string} $body Request body
 */
function processHttpRequest($method, $uri, $headers, $body) {
    const statusCode = $method === "GET" ? $uri.startsWith("/sum") ? 200 : 404 : 400;
    const statusMessage = getStatusMessage(statusCode);
    const body = (statusCode === 200) && /\?nums=[\d,]+/g.test($uri)
        ? sum($uri.match(/(?:nums=)([\d,]+)/)[1].split(",").map(num => +num))
        : "";
    const headers =
        `${new Date()}\n` +
        `Server: Apache/2.2.14 (Win32)\n` +
        `Content-Length: ${body.toString().length}\n` +
        `Connection: Closed\n` +
        `Content-Type: text/html; charset=utf-8`;

    outputHttpResponse(statusCode, statusMessage, headers, body);
}

/**
 * Prints fromatted response to the console.
 * 
 * @param {string} statusCode Status code
 * @param {string} statusMessage Status message
 * @param {string} headers Headers
 * @param {string} body Body
 */
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}\n${headers} ${body ? "\n" + body : ""}`);
}


/**
 * Returns a message depending on status code.
 * 
 * @param {number} statusCode Status code of request.
 * @returns {string} Status message.
 */
function getStatusMessage(statusCode) {
    switch (statusCode) {
        case 200: return "OK";
        case 400: return "Bad Request";
        case 404: return "Not Found";
        default: throw new Error("Wrong status code");
    }
}

/**
 * Sums all numbers in specified array.
 * 
 * @param {number[]} nums Array of numbers.
 * @returns {number} Total sum.
 */
const sum = (nums) => nums.reduce((total, num) => total += num);

/**
 * Parses request.
 * 
 * @param {string} string Request as string
 * @returns {Object} Object with properties of request.
 */
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

/* Create request */
const contents = 
    `GET /sum?nums=1,2,3,8,10 HTTP/1.1\n` +
    `Host: student.shpp.me\n` +
    `\n`;

    console.log(contents);

/* Parse request */
const http = parseTcpStringAsHttpRequest(contents);

/* Process request and print response to the console */
processHttpRequest(http.method, http.uri, http.headers, http.body);