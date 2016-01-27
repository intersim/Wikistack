var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new Schema({
  title:  {type: String, required: true},
  urlTitle: {type: String, required: true},
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
  status: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

pageSchema.pre('validate', function (next) {
  if (this.title) {
    this.urlTitle = this.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    this.urlTitle = Math.random().toString(36).substring(2, 7);
  }
  next();
});

pageSchema.virtual('route').get(function () {
  return '/wiki/' + this.urlTitle;
})

var userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', pageSchema);

module.exports = {
  Page: Page,
  User: User
}