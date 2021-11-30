const http = require("http");

const host = 'localhost';
const port = 8000;
const requestListener = function (req, res) {
res.setHeader("Content-type", "application/json");
res.writeHead(200);
res.end(`{"message" : "This is a JSON response"}`) 
//res.end('https://www.affirmations.dev/')

  
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
/*let xhr = $.get('https://www.affirmations.dev/');
xhr.done(function(data) {
    $( "#source" ).attr( "src", data.data.embed_url);
    console.log("success got data", data);
})
*/
http.get('https://www.affirmations.dev/' , (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
