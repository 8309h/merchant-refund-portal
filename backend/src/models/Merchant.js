const mongoose = require('mongoose');
const MerchantSchema  =  new mongoose.Schema({
      email : {type : String,required : true},
      password : {type : String,required : true},
      name : {type : String,required : true},
      createdAt : {type : Date,default : Date.now}
})
const Merchant = mongoose.model('Merchant',MerchantSchema);
module.exports = Merchant;