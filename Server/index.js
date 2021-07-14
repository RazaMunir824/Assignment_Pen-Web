const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose')
const app = express()

//Files
const user = require('./routes/user')
const login = require('./routes/login')


//MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


//Monogo Connection
const db =config.get('mongoURI');
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true   })
.then(() => console.log('MongoDB conectedd..'))
.catch(err => console.log(err))


//Routes
app.use('/api' , user)
app.use('/api' , login)


//Listen 
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log("Serverr running at port, ", PORT));