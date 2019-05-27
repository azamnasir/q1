const express = require("express");
const router = express.Router();
const http = require("http");
var data = '';
var responses = [];
var indicator = false;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getHeaders(element, callback) {
  var options = {
    host: element,
    port: 80,
    path: "/",
    method: "GET"
  };
  var reque = http.request(options,  function(res) {
    var body = '';
    res.on("data", function(chunk) {
       body += chunk;
      });
      res.on('end', function () {
        
          const dom = new JSDOM(body);
          responses.push(dom.window.document.querySelector("title").textContent); 
          console.log(responses);
          callback(null);
        
                      
    });
           
  });
  function setError (error)
  {
    data = error;
  }

  reque.on("error", function(e) {
    console.log("problem with request: " + e.message);
    setError("problem with request: " + e.message);
  });
  reque.end();
  
}

router.get("/", (req, res, next) => {
  var str = String(req.query.address);
  var addresses = str.split(",");
  console.log(addresses);
  addresses.forEach(function (element)
  {
      getHeaders(element, ()=>{
        if(responses.length == addresses.length)
        {
          indicator = true;
          var li = '';
          for (let index = 0; index < responses.length; index++)
          {
            li += '<li>'+addresses[index]+ ' - "' +responses[index]+'"</li>'
          } 
          data = '<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>'+li+'</ul></body></html>';
          console.log(data);
          res.status(200).send(data);
        }
        
      });  
  });
  
   

  

});

router.post("/", (req, res, next) => {
  res.status(404).send(responses);
});

module.exports = router;
