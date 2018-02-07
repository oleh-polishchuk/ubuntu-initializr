const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    script: { type: String, required: true },
    approved: { type: Boolean },
    rating: { type: Number },

    dependencies: [ {
        id: { type: Number }
    } ]
});

module.exports = mongoose.model('Installer', schema);
