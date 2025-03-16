const jwt = require('jsonwebtoken');
const Deck = require('./schema/Deck');
const Card = require('./schema/Card');
const CardProgress = require('./schema/CardProgress');
const mongoose = require('mongoose');
const { createEmptyCard } = require('ts-fsrs');
const dotenv = require('dotenv');
dotenv.config();
const SMPT_CONFIG = require('./smpt.js');

function createError(message, status) {
    const error = new Error(message);
    error.status = status;
    return error;
};

module.exports.createError = createError;

module.exports.generateToken = (data, expiration) => {
    return jwt.sign(
        data, 
        process.env.JWT_SECRET, 
        { expiresIn: expiration }
    );
};

module.exports.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const recursivelyDeleteDeck = async (deckId) => {
    const deck = await Deck.findById(deckId);

    for(const subDeckId of deck.subDecks) {
        await recursivelyDeleteDeck(subDeckId);
    }

    for(const cardId of deck.cards) {
        await Card.findByIdAndDelete(cardId);
        await CardProgress.findOneAndDelete({ cardId: cardId });
    }

    await Deck.findByIdAndDelete(deckId);
};
module.exports.recursivelyDeleteDeck = recursivelyDeleteDeck;

module.exports.validateAndGetModel = async (Model, modelId, userId, getAdminDecks = false) => {
    if (!mongoose.Types.ObjectId.isValid(modelId)) {
        throw createError(`Invalid ${Model.modelName} ID`, 400);
    }

    const model = await Model.findById(modelId);

    if (!model) {
        throw createError(`${Model.modelName} not found`, 404);
    }

    if (model.userId.toString() != userId.toString() && (!getAdminDecks || model.userId.toString() !== process.env.ADMIN_ID)) {
        throw createError(`You are not authorized to access this ${Model.modelName}`, 403);
    }

    return model;
};

module.exports.validateAndGetCard= async (cardId, userId, getAdmin = false) => {
    return module.exports.validateAndGetModel(Card, cardId, userId, getAdmin)
}

module.exports.validateAndGetDeck = async (deckId, userId, getAdmin = false) => {
    return module.exports.validateAndGetModel(Deck, deckId, userId, getAdmin)
}

module.exports.createCardProgress = async (cardId, userId) => {
    const emptyProgress = createEmptyCard();

    const cardProgress = await CardProgress.create({
        ...emptyProgress,
        userId,
        cardId
    })

    return cardProgress;
}

const getPath = async (deckId) => {
    const deck = await Deck.findById(deckId);

    if(deck.parentDeckId) {
        const parentPath = await getPath(deck.parentDeckId);
        return parentPath.concat([deckId]);
    }
    else {
        return [deckId];
    }
}
module.exports.getPath = getPath;

module.exports.verificationEmail = (recipient, token) => {
    return {
        from: `DecoraMed <${SMPT_CONFIG.user}>`,
        to: recipient,
        subject: 'Verificação de Email - Decoramed',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Bem-vindo ao DecoraMed!</h2>
                <p>Olá,</p>
                <p>Obrigado por se registrar no DecoraMed. Para concluir a criação de sua conta, por favor, clique no link abaixo para verificar seu endereço de email:</p>
                <p>
                    <a href="https://decoramed-2.onrender.com/api/verify/${token}" style="color: #1a73e8; text-decoration: none;">
                        Verificar Email
                    </a>
                </p>
                <p>Se você não solicitou esta verificação, por favor, ignore este email.</p>
                <p>Atenciosamente,<br>Equipe DecoraMed</p>
            </div>
        `
    }
};
