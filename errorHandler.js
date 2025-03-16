const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
    });

    console.log('\n\n\nGAY\n\n\n')
    console.log(err);
};

module.exports = errorHandler;
