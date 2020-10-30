//packages
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//env
require('dotenv').config();

//routes
const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to Database...')
})
.catch((err) =>
    console.log(err)
);

//middlewares
app.use(helmet())

    //parser
    app.use(bodyParser.json())
    app.use(cookieParser())
    //logs
    app.use(morgan('dev'))
    //cors
    if (process.env.NODE_ENV == 'development') {
        app.use(cors({origin: `${process.env.CLIENT_URL}`}));
    }
    //routes
    app.use('/api', blogRoute);
    app.use('/api', authRoute);


//cookies
app.get("/", function (req, res) {
    // Cookies that have not been signed
    console.log("Cookies: ", req.cookies);

    // Cookies that have been signed
    console.log("Signed Cookies: ", req.signedCookies);
});

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});