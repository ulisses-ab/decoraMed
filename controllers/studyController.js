const CardProgress = require('./../schema/CardProgress');
const asyncHandler = require('express-async-handler');
const { createError, validateAndGetDeck, validateAndGetCard } = require('./../utility');
const { createEmptyCard, formatDate, fsrs, generatorParameters, Rating, Grades } = require('ts-fsrs');

const f = fsrs();

const getCards = asyncHandler(async (req, res) => {
    const deckId = req.params.id || req.user.rootDeckId;

    const deck = await validateAndGetDeck(deckId, req.user._id);
    
    let now = new Date();
    now.setMinutes(now.getMinutes());

    let cardList = await CardProgress
        .find({
            due: { $lt: now },
            userId: req.user._id
        })
        .sort({ due: 1 })
        .select('-_id cardId')
        .populate('cardId');

    cardList = cardList
        .map(obj => obj.cardId)
        .filter(card => card.path.includes(deckId));

    res.json(cardList);
})

const getTimes = asyncHandler(async (req, res) => {
    const card = await validateAndGetCard(req.params.id, req.user._id);
    const cardProgress = await CardProgress.findOne({
        cardId: card._id,
    })
    const now = new Date();

    const study = f.repeat(cardProgress._doc, now);
    const newDueDates = [study['1'], study['2'], study['3'], study['4']].map((element) => (element.card.due - now) / 60000);

    res.json(newDueDates);
})


const studyCard = asyncHandler(async (req, res) => {
    const card = await validateAndGetCard(req.params.id, req.user._id);
    const cardProgress = await CardProgress.findOne({
        cardId: card._id,
    })
    const now = new Date();

    if(parseInt(req.params.difficulty) < 1 || parseInt(req.params.difficulty) > 4) throw createError("Invalid difficulty", 400)

    const newCardProgress = f.repeat(cardProgress._doc, now)[req.params.difficulty].card;
  
    await CardProgress.findByIdAndUpdate(cardProgress._id, newCardProgress);


    res.json({ message: "Card studied"})
})

module.exports = { getCards, studyCard, getTimes };
