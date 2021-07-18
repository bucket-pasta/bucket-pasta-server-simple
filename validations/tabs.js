import status from 'http-status';

const addTab = (req, res, next) => {
    const { displayName } = req.body;

    if (!displayName) {
        res.status(status.BAD_REQUEST);
        next(new Error('displayName Must be Defined in request body'));
    } else {
        next();
    }
};


export default { addTab };
