const { createError, validateAndGetCard, validateAndGetDeck, createCardProgress, getPath } = require('./../utility');
const Card = require('./../schema/Card');
const Deck = require('./../schema/Deck');
const asyncHandler = require('express-async-handler');
const CardProgress = require('../schema/CardProgress');

const createCard = asyncHandler(async (req, res) => {
    const { type, front, back } = req.body;
    const userId = req.user._id;
    const deckId = req.body.deckId || req.user.rootDeckId;


    if(!type || !front || (type === 'normal' && !back)) {
        throw createError("Invalid card", 400);
    }

    const deck = await validateAndGetDeck(deckId, userId, false);
    
    const path = await getPath(deckId);

    const card = await Card.create({
        type,
        front,
        back,
        userId,
        path
    })

    deck.cards.push(card._id);

    await deck.save();

    await createCardProgress(card._id, userId);

    res.json(card);
})

const getCard = asyncHandler(async (req, res) => {
    const card = await validateAndGetCard(req.params.id, req.user._id);
    res.json(card);
});

const updateCard = asyncHandler(async (req, res) => {
    const card = await validateAndGetCard(req.params.id, req.user._id);
    const { type, front, back, deckId: newDeckId } = req.body;

    if(type) card.type = type;
    if(front) card.front = front;
    if(back) card.back = back;
    if(newDeckId) {
        const newDeck = await validateAndGetDeck(newDeckId, req.user._id, false);

        await Deck.findByIdAndUpdate(card.deckId, {
            $pull: {
                cards: card._id
            },
        })

        card.path = await getPath(newDeckId);

        newDeck.cards.push(card._id);

        await newDeck.save();
    } 

    card.save();

    res.json(card);
});

const deleteCard = asyncHandler(async (req, res) => {
    const card = await validateAndGetCard(req.params.id, req.user._id);

    const d = await Deck.findByIdAndUpdate(card.path.at(-1), {
        $pull: {
            cards: card._id
        },
    }, { new: true });
    console.log(d);

    await Card.findByIdAndDelete(card._id);
    await CardProgress.findOneAndDelete({ cardId: card._id });

    res.json({ message: 'Card deleted successfully' });
});

module.exports = { createCard, getCard, updateCard, deleteCard };

