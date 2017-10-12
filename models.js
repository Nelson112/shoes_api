var mongoose = require('mongoose');
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/shoes";

mongoose.connect(mongoURL, {
  useMongoClient: true,
});
exports.storedshoes = mongoose.model('storedshoes', {
  brand: String,
  color: String,
  size: Number,
  in_Stock: Number,
  price: Number
});
