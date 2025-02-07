const mongoose = require('mongoose');


const BannerSchema = new mongoose.Schema({
    title:{
        type:String,
        requires:true
    },
    imgUrl:{
        type:String,
        requires:true
    },
    description:{
        type:String,
    },
    link:{
        type:String,
    }
});


module.exports = mongoose.model('Banner', BannerSchema);