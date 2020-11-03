require('dotenv').config() // globals via process.env

let express = require('express'); // middleware
let path = require('path');
let cors = require('cors'); // cross-origin handling
let helmet = require('helmet'); // header security ??
let morgan = require('morgan'); // logger

let PORT = process.env.PORT || 8080; // get port # global

const app = express(); // initialize app
app.use(cors()); // apply CORS
app.use(helmet()); // attach request header security
app.use(morgan('dev')); // specify server-side logging detail

// root route
app.get('/', (req, res, next) => {
    // GET req response config
    let options = {
        root: path.join(__dirname, 'public'), // set client-accessible root as public/
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    // send index file
    res.sendFile('index.html', options, (err) => {
        if (err) next(err);
        else console.log('sent: index.html');
    });
});

app.listen(PORT, () => {
    console.log(`HRMNI server listening on port ${PORT}`);
});