require('joi');

module.exports = (schema) => {
    return (req, res, next) => {
        // eslint-disable-next-line no-unused-vars
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.error(error
                .details[0].message.replace(new RegExp('\"', 'ig'), ''));
        } else {
            next();
        }
    };
};