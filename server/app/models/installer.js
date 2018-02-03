const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    rating: {type: Number},
    script: {type: String},

    dependencies: [{
        id: {type: Number}
    }]
});

module.exports = mongoose.model('Installer', schema);
