const http = require('http');
const fileSystem = require('fs');
const express = require('express');
const ss = require('socket.io-stream');
const path = require('path');
const app = express();
const api = express();

//Non streaming load file API
api.get('/track', (req, res, err) => {
  // generate file path
  const filePath = path.resolve(__dirname, './private', './track.wav');
  // get file size info
  const stat = fileSystem.statSync(filePath);

  // set response header info
  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  });
  //create read stream
  const readStream = fileSystem.createReadStream(filePath);
  // attach this stream with response stream
  readStream.pipe(res);
});

//register api calls
app.use('/api/v1/', api);

// send react app on / GET
app.use(express.static(path.resolve(__dirname, './public/build/')));
app.use(express.static(path.resolve(__dirname, './public/assets/')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/build/', './index.html'));
});

const server = http.createServer(app);
const io = require('socket.io').listen(server, {
  log: false,
  agent: false,
  origins: '*:*',
  transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

io.on('connection', client => {

  const stream = ss.createStream();

  client.on('track', () => {
    const filePath = path.resolve(__dirname, './private', './track.wav');
    const stat = fileSystem.statSync(filePath);
    const readStream = fileSystem.createReadStream(filePath);
    // pipe stream with response stream
    //readStream.pipe(stream);

    ss(client).emit('track-stream', stream, { stat });

    startStr = () => {
      readStream.pipe(stream);
      console.log("Stream starting!")
    }

    stopStr = () => readStream.unpipe(stream);
    
    startStr();


    console.log('Now data will start flowing (first time) for 5 seconds.');

    console.log('NOTE: There will be no additional data AFTER 5 seconds...');
    
    
    setTimeout(() => {
      console.log("Waited 5s. NOW STOPPING") 
      stopStr(); 
    }, 5000);
    
    
    //console.log('Now data will start flowing again.');
    
    /*
    setTimeout(() => {
      readStream.pipe(stream);
      console.log("Running FINAL")
    }, 15000);
    */

  });
  client.on('disconnect', () => {});
});

server.listen(process.env.PORT || '3001', function () {
  console.log('Server app listening on port 3001!');
});
