const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: '669997d47f2f4c7f9e52e0a1ce9601b6'
   });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with the api'))
}

const handleImage = (req, res, db)=> {
    const {id} = req.body;
   db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
       res.json(entries[0])
   })
   .catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}