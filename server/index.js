const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/searchDB', 
  { useNewUrlParser: true,
   useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  items: [String],
  address: String,
  pincode: String
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
  const users = req.body.users;
  await User.insertMany(users);
  res.send('Users added');
});

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const users = await User.find({
    $or: [
      { id: { $regex: query, $options: 'i' } },
      { name: { $regex: query, $options: 'i' } },
      { items: { $regex: query, $options: 'i' } },
      { address: { $regex: query, $options: 'i' } },
      { pincode: { $regex: query, $options: 'i' } }
    ]
  });
  res.send(users);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
