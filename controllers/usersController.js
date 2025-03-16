const User = require('./../schema/User');
const asyncHandler = require('express-async-handler');
const { recursivelyDeleteDeck } = require('./../utility');

const getUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.user._id);

    await recursivelyDeleteDeck(user.rootDeck);

    res.json({ message: 'User deleted successfully' });
});

module.exports = { getUser, deleteUser };
