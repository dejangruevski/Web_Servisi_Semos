const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Mora da ima naslov'],
    trim: true, // trim gi brishe praznite mesta
    minlength: 1,
    maxlength: [255, 'Naslovot e predolg'],
    unique: [true, 'Mora da ima razlicen naslov od vekje posteckiot'],
  },
  description: {
    type: String,
    required: [true, 'Mora da ima opis'],
    trim: true, // trim gi brishe praznite mesta
    minlength: 1,
    maxlength: [2000, 'Opisot e predolg'],
  },
  phone: {
    type: Number,
  },
  picture: {
    type: String,
    default: 'default.jpg',
  },
});

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;