function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

function parseTcpStringAsHttpRequest(string) {
    return {
    method: string.match(/\w+/)[0],
    uri : string.match(/\/(\w+\/)+\w+(\.html)?/)[0],
    headers: Object.fromEntries(
        string
            .match(/([\w-]+:\s?.+)/g)
            .map( str => str.replace(" ", "").split(":"))
        ),
    body :string.match(/(.*)\s*$/)[1],
  }; 
}

http = parseTcpStringAsHttpRequest(contents); 
console.log(JSON.stringify(http, undefined, 2));