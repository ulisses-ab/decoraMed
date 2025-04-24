const bcrypt = require('bcrypt');
const User = require('./../schema/User');
const Deck = require('./../schema/Deck')
const asyncHandler = require('express-async-handler');
const { createError, generateToken, validateEmail, createCardProgress, verificationEmail } = require('./../utility');
const Card = require('../schema/Card');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const SMPT_CONFIG = require('../smpt.js');


const transporter = nodemailer.createTransport({
  host: SMPT_CONFIG.host,
  port: SMPT_CONFIG.port,
  secure: true,
  auth: {
    user: SMPT_CONFIG.user,
    pass: SMPT_CONFIG.pass,
  },
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw createError('Please provide all required fields', 400);
    }
    
    const user = await User.findOne({ email });

    if(!user) {
        throw createError('User not found', 404);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if(!isPasswordCorrect) {
        throw createError('Password is incorrect', 401);
    }

    res.json({ 
        token: generateToken({ id: user._id }, '30d'), 
    });
});

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw createError('Please provide all required fields', 400);
    }

    if (!validateEmail(email)) {
        throw createError('Please provide a valid email address', 400);
    }

    if (password.length < 8) {
        throw createError('Password must be at least 8 characters long', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw createError('User already exists', 409);
    }

    const token = generateToken({ name, email, password }, '10m');

    transporter.sendMail(verificationEmail(email, token), (error, info) => {
        if (error) {
            console.log(error);
        }
    });

    res.json({ message: 'Email sent successfully' });
});

const verify = asyncHandler(async (req, res) => {
    console.log('verify')
    const token = req.params.token;
    const { name, email, password } = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw createError('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, hashedPassword });
    const rootDeck = await Deck.create({ name, userId: user._id });
    user.rootDeckId = rootDeck._id;
    await user.save();

    const adminCards = await Card.find({ userId: process.env.ADMIN_ID })
    adminCards.forEach(async (card) => {
        await createCardProgress(card._id, user._id);
    })

    res.json({ 
        token: generateToken({ id: user._id }, '30d'),
    });
});

module.exports = { login, register, verify };
