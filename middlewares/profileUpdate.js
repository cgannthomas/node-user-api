module.exports = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    
    if (req.user.id !== req.params.id) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }

    next();
};