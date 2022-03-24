const { debug } = require('console');

const http = require('http');
const app = require('./Backend/app');
const cors = require('cors')

app.use(cors());
const normalizePort = val =>{
  var port = parseInt(val, 10);
  if(isNaN(port)){
    return val;
  }

  if(port>= 0){
    return port;
  }
  return false;
};

const onError = error => {
  if(error.syscall !== "listen"){
    throw error;
  }
  const bind = typeof addr === "string"? "pipe" + addr :"port" + port;
  switch(error.code){
    case "EACCES":
      console.error(bind + "requires elivated privileges");
      process.exit(1);

      case "EADDRINUSE" :
      console.error(bind + "is already in use");
      process.exit(1);

      default:
        throw error;

  }
};

const onListening =() =>{
  const addr = Server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  debug("Listening on "+ bind);
};

const port = normalizePort( process.env.PORT || 3000);
app.set('port', port);
const Server = http.createServer(app);
Server.on("error", onError);
Server.on("listening", onListening);


Server.listen(port);
