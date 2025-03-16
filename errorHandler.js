const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
    });

    console.log(err);
};

module.exports = errorHandler;
