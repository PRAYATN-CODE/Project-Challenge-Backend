const mongoose = require('mongoose');
const moment = require('moment');

const itemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
});

itemSchema.virtual('age').get(function () {
    return moment().diff(moment(this.dob), 'years');
});

itemSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Item', itemSchema);
