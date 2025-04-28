const mongoose = require('mongoose'); 
const Deck = require('./../schema/Deck');
const asyncHandler = require('express-async-handler');
const { createError, recursivelyDeleteDeck, validateAndGetDeck, getPath, recursivelyPopulateDeck } = require('./../utility');

const createDeck = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const userId = req.user._id;
    const parentDeckId = req.body.parentDeckId || req.user.rootDeckId;

    console.log(req.user, parentDeckId);


    if (!name) {
        throw createError('Please provide the required fields', 400);
    }

    const parentDeck = await validateAndGetDeck(parentDeckId, userId, false);
    const deck = await Deck.create({ name, userId, parentDeckId });

    parentDeck.subDecks.push(deck._id);
    await parentDeck.save();

    res.json(deck);
});

const getDeck = asyncHandler(async (req, res) => {
    const deck = await validateAndGetDeck(req.params.id, req.user._id, true);

    res.json(deck);
});

const getUserDecks = asyncHandler(async (req, res) => {
    const decks = await Deck.find({ userId: req.user._id });
    res.json(decks);
})

const updateDeck = asyncHandler(async (req, res) => {
    const deck = await validateAndGetDeck(req.params.id, req.user._id, false);
    const { name, parentDeckId: newParentDeckId } = req.body;

    if(name) deck.name = name;
    if(newParentDeckId) {
        const newParentDeck = await validateAndGetDeck(newParentDeckId, req.user._id, false);

        if(deck._id in getPath(newParentDeckId)) throw createError("You cant put a deck inside one of its children", 400)

        await Deck.findByIdAndUpdate(deck.parentDeckId, {
            $pull: {
                subDecks: deck._id
            },
        })

        deck.parenDecktId = newParentDeckId;

        newParentDeck.subDecks.push(deck._id);
        await newParentDeck.save();
    }
    await deck.save();

    res.json(deck);
});

const deleteDeck = asyncHandler(async (req, res) => {
    const deck = await validateAndGetDeck(req.params.id, req.user._id, false);

    if(!deck.parentDeckId) {
        throw createError("Deleting a root deck is not allowed", 400);
    }

    await Deck.findByIdAndUpdate(deck.parentDeckId, {
        $pull: {
            subDecks: deck._id
        },
    })

    await recursivelyDeleteDeck(deck._id);

    console.log('deleted');
    res.json({ message: 'Deck deleted successfully' });
});

const getChildren = asyncHandler(async (req, res) => {
    await validateAndGetDeck(req.params.id, req.user._id);
    const deck = await Deck.findById(req.params.id).populate('cards').populate('subDecks');

    const obj = {
        cards: deck.cards,
        decks: deck.subDecks
    };

    res.json(obj);
});
 

module.exports = { createDeck, getDeck, getUserDecks, updateDeck, deleteDeck, getChildren };
