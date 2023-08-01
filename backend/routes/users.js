const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

const saltRounds= 10;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function(next){
    if (this.isNew || this.isModified('password')){
        const document = this;

        bcrypt.hash(document.password, saltRounds, (error, hashedPassword) => {
            if (error){
                next (error);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

userSchema.methods.isCorrectPassword = function(candidatePassword, callback){
    bcrypt.compare(password, this.password, function(error, same){
        if (error){
            callback(error);
        } else{
            callback(error, same);
        }
    });
}

module.exports = mongoose.model('User', userSchema);