const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx.insert({hash, email})
    .into('login')
    .returning('email')
    .then(loginEmail => {
      db('users')
      .returning('*')
      .insert({
        name: name,
        email: loginEmail[0],
        joined: new Date(),
      })
      .then(user => {
        res.json(user);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback);
  })
  .catch(err => res.status(400).json('Unable to register:' + err));
}

module.exports = {handleRegister};