const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

let userSchema = new Schema({
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            unique: true,
            index: true,
            lowercase: true
        },
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        socialProfiles: [{
                twitter: String
            },
            {
                facebook: String
            },
            {
                linkedin: String
            },
            {
                instagram: String
            }
        ],
        role: {
            type: Number,
            trim: true
        },
        history: {
            type: Array,
            default: []
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        about: {
            type: String
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    { collection: "Users", timestamps: true }
);

//virtual field to encryot password and authentication
userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv4()
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})


userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) == this.hashed_password;
    },
    encryptPassword: function(password) {
        if(!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex')
        } catch (err) {
            return ''
        }
    }
};

module.exports = mongoose.model('User', userSchema)