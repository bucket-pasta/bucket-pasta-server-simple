import status from 'http-status';

const addPasties = (req, res, next) => {
    const { tabId, displayName } = req.body;

    if (!tabId || !displayName) {
        res.status(status.BAD_REQUEST);
        next(new Error('tabId and displayName Must be Defined in request body'));
    } else {
        next();
    }
};


export default { addPasties };
