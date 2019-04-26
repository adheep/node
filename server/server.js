const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const sysConfig = require('./dbConnectionPool');

var whitelist = ['*/*']
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const allowCrossDomain= (req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
  }

// Then pass them to cors:
//app.use(cors(corsOptions));
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
}); 
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/api/getOwnerId', (req, res) => {
  let body = req.body;
  let domainName = body.domainName;
  sysConfig.sysConfigPool.query(sysConfig.sqls.getSysConfigValue,[domainName,'Y'], function (error, results, fields) {
    if (error) throw error;
    if(results.length>0) {
      let OwnerId = results[0].ATTRIBUTE_VALUE;
      let Mode = results[0].MODE;
      let Environment = results[0].ENVIRONMENT;
      res.send({ OwnerId, Mode, Environment});
    } else {
      res.send({ error: 'No records found'});
    }
  });
});

app.post('/api/login', (req, res) => {
  let body = req.body;
  console.log("Request to actual service : %o", body)
  let url = 'https://ucicommonservice.solartis.net/CommonServiceV2_1/AuthenticationServiceV2/requestService'
  let headers = {
    headers:{
      "Content-Type":"application/json"
    }
  }
  const axios = require('axios');
  axios.post(url,body,headers).then(response=>{
    console.log(response.data)
    res.send(response.data)
  })

});

app.get('/api/encrypt/:password', (req, res) => {
  var request = require('request');
  var password = req.params.password;
  var headers = {
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryjx3P0QlaBkH15oNY',
      'accept': 'application/json, text/plain, */*'
  };

  var dataString = '$------WebKitFormBoundaryjx3P0QlaBkH15oNY\r\nContent-Disposition: form-data; name="file"\r\n\r\nundefined\r\n------WebKitFormBoundaryjx3P0QlaBkH15oNY\r\nContent-Disposition: form-data; name="data"\r\n\r\n{"textToEncrypt":"'+ password +'","secretKey":"3FCCB01F507E8EB0","mode":"ECB","keySize":"128","dataFormat":"Base64"}\r\n------WebKitFormBoundaryjx3P0QlaBkH15oNY--\r\n';
  
  let url = 'https://www.devglan.com/online-tools/aes-encryption'
  const axios = require('axios');
  axios.post(url,dataString,headers).then(response=>{
    console.log(response.data)
    if (response.statusCode == 200) {
      let resp=JSON.parse(body);
      let tempResponse = { 
        inputText: resp.textToEncrypt,
        encryptedText: resp.output
      };
      console.log("["+new Date().getTime()+":"+req.connection.remoteAddress+"] Message:: "+JSON.stringify(tempResponse));
      res.send(tempResponse);
    } else {
      res.send({
        error: 500
      })
    }
  })  
});

app.listen(port, () => console.log(`Listening on port ${port}`));