import Model from '../Models/Model';

const addTabs = (req, res, next) => {
    const { displayName, tags, theme, type } = req.body;

    const event = new Model.TabsModel({
        displayName,
        tags,
        theme,
        type
    });
    event
        .save()
        .then(savedEvent => {
            // adding its reference to user
            Model.UserModel.findByIdAndUpdate(
                req.user._id,
                { $push: { tabs: savedEvent._id } },
                { upsert: true, new: true },
                (err, doc) => {
                    if (err) { } else { }
                },
            );
            res.status(200).send({
                savedEvent,
                message: 'Tabs Created Successfully'
            });
        })
        .catch(err => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const deleteTabs = (req, res, next) => {
    const { id } = req.params;
    Model.TabsModel.findByIdAndRemove(id, (err, result) => {
        if (result) {
            res.status(200).send({
                Message: 'Tab Deleted Successfully.',
            });
        } else {
            res.status(500);
            next(new Error('Internal Server Error!'));
        };
    });
};

const editTabs = (req, res, next) => {
    const { id } = req.params;
    const query = { $set: req.body };
    Model.TabsModel.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
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

export default { addTabs, deleteTabs, editTabs };
