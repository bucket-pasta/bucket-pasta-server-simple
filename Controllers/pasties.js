import Model from '../Models/Model';

const addPasties = (req, res, next) => {
    const { displayName, tags, theme, content, type, tabId } = req.body;

    const event = new Model.PastiesModel({
        displayName,
        tags,
        theme,
        type,
        content
    });
    event
        .save()
        .then(savedEvent => {
            // adding its reference to tabs
            Model.TabsModel.findByIdAndUpdate(
                tabId,
                { $push: { pasties: savedEvent._id } },
                { upsert: true, new: true },
                (err, doc) => {
                    if (err) { } else { }
                },
            );
            res.status(200).send({
                savedEvent,
                message: 'Pasties Created Successfully'
            });
        })
        .catch(err => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const deletePasties = (req, res, next) => {
    const { id } = req.params;
    Model.PastiesModel.findByIdAndRemove(id, (err, result) => {
        if (result) {
            res.status(200).send({
                Message: 'Pasty Deleted Successfully.',
            });
        } else {
            res.status(500);
            next(new Error('Internal Server Error!'));
        };
    });
};

const editPasties = (req, res, next) => {
    const { id } = req.params;
    const query = { $set: req.body };
    Model.PastiesModel.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
        if (err) {
            res.status(500);
            next(new Error('Internal Server Error!'));
        } else {
            res.status(200).send({
                Message: 'Successfully Updated.',
                result,
            });
        }
    });
};

export default { addPasties, deletePasties, editPasties };
