const knex = require('./knexfile.js');

const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '2cf6c1c55abe40f2a1d11c8180f1a7ca'
});
const handleApiCall = (req,res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res) => {
    let { id } = req.body;
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to do it'))
}

module.exports = {
	handleImage,
    handleApiCall
}