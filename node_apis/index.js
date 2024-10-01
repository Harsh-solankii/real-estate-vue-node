const express = require('express');
const app = express();
const port = 3087;
const dotenv = require('dotenv');
dotenv.config();
var bodyParser = require('body-parser');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const server = app.listen(port);

sequelize.sync();

app.use(cors());
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false  }))
app.use(cookieParser());
app.use(express.static('public'));
app.use(router);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true
});


app.set("socketio", io);

io.on('connection', (socket) => {
  console.log('User connected',socket.id);

  socket.on('send_message', (data) => {
    io.emit(`receive_message-${data.channel_id}`,(data));
  });

});
