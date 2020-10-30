const {check} = require('express-validator');

exports.userSignupValidator = [

    check('name')
        .notEmpty()
        .withMessage("Can't leave your name empty, what would I call you?"),
    check('email')
        .isEmail()
        .withMessage('Either you mistype your email or it is not a valid one'),
    check('password')
            .isLength({min: 8})
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}$/, "i")
            .withMessage('Password should have a min of 8 characters, a combination of a number, uppercase & lowercase letters and cannot have special characters')
];

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Incorrect or unregistered email'),
    check('password')
            .isLength({min: 8})
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}$/, "i")
            .withMessage('Incorrect Password')
];

