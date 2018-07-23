const handleProfile = (db) => (req, res) => {
  const { id } = req.params;
  let found = false;
  
  db.select('*').from('users').where({id})
  .then(user => {
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(404).json('not found');
    }
  })
  .catch(err => res.status(400).json(err));
}


module.exports = {handleProfile};