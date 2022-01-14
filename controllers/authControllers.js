const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleError = (err) => {

    let errors = { email:'', password: ''}
    
    if(err.message.includes('Please enter a valid email')){
        errors.email = 'Please enter a valid email';
    }
    if(err.message.includes('Minimum length of password must be 8 characters')){
        errors.password = 'Minimum length of password must be 8 characters';
    }
    if(err.message.includes('Please enter password')){
        errors.password = 'Please enter password';
    }
    if(err.message.includes('incorrect email')){
        errors.email = 'Email is not Registered';
    }
    if(err.message.includes('incorrect password')){
        errors.password = 'Incorrect password';
    }
    // duplicate error code
    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }
    return errors;
}
const maxAge = 3 * 24 * 60 * 60;

// creating tokens
const createTokens = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY , { 
        expiresIn: maxAge
     });
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.create({email, password});
        // console.log(user);
        const token = createTokens(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user });
    } catch (err) {
        // console.log(err);
        const errors = handleError(err);
        res.status(404).json({errors});
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createTokens(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user });        
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({errors});
    }
}

module.exports.logout_get = (req, res) => {
    // res.cookie('jwt', '', {httpOnly: true, maxAge: 1});
    res.clearCookie('jwt').status(204).json({message: 'Logged out successfully'});
    // res.status(204).json({message: 'Logged out successfully'});
}