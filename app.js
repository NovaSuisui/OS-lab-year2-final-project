const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

//Database
const db = require('./config/database');
const { publicDecrypt } = require('crypto');
db.authenticate()
    .then(() => console.log('Database connect...'))
    .catch(err => console.log('Error : '+err))

const app = express();

//Handlebars
app.engine('handlebars', exphbs.engine({ extname: 'handlebars',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars')

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

//Routes
app.use('/studentData', require('./routes/student'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));