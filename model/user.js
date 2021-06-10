const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true, select: false},
    nomecompleto: {type: String, required: true, unique: true, lowercase: true},
    sexo: {type: String, required: true, unique: true, lowercase: true},
    datanascimento: {type: String, required: true, unique: true, lowercase: true},
    idade: {type: String, required: true, unique: true, lowercase: true},
    cidade: {type: String, required: true, unique: true, lowercase: true},
    created: { type: Date, default: Date.now}
})

UserSchema.pre('save', function (next){
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, encrypted)=>{
        user.password = encrypted;
        return next();
    });
});

module.exports = mongoose.model('User', UserSchema);

//Cidades: nome e estado
//Cliente: nome completo, sexo, data de nascimento, idade e cidade onde mora.