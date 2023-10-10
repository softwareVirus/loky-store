const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      hashed_password: {
        type: String,
        required: true,
      },
      salt: {
        type: String,
        required: true
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      favoriteProducts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'OrderCard',
        },
      ],
    },
    { timestamps: true } // This option adds created_at and updated_at fields
  )

UserSchema.plugin(autopopulate)
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema)