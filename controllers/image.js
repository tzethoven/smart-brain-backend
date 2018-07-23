const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'fae717bb78644756845b8d0546012673'
});

const handleApiCall = (req, res) => {
  app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL, 
    req.body.input)
  .then(data => res.json(data))
  .catch(err => res.status(400).json(err));
}

const handleImage = (db) => (req, res) => {
  const { id, nFaces } = req.body;

  db('users')
  .where({id})
  .increment('entries', nFaces)
  .returning('*')
  .then(user => res.json(user))
  .catch(err => res.status(400).json(err));
}

module.exports = {handleImage, handleApiCall};