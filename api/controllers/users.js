
const mangoose = require('mongoose');


const User =  require('../models/user');

exports.insert_user = (req, res, next) => {
    var currentDate = Date.now();

    const user = new User({
            _id: new mangoose.Types.ObjectId(),
            name:req.body.name,
            practiceName: req.body.practiceName,
            createdDate:currentDate,
            isAdmin:false,
            email:req.body.email
    });
    user.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'User inserted successfully',
            id: result._id

        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.get_all_users = (req, res, next) => {
    console.log("working......");
    User.find()
        .then(result => {
            // const response = {
            //     count: result.length,
            //     reviews: result
            // }
            result = sort_by_key(result, 'createdDate');

            res.status(200).json(result);

        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};
exports.user_by_id = (req, res, next) =>{
    const email = req.body.email

    console.log(email);
    User.find({"email":email})
        .then(doc => {
            
            res.status(200).json(doc);
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

};

function sort_by_key(array, key)
{
 return array.sort(function(a, b)
 {
  var y = a[key]; var x = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}