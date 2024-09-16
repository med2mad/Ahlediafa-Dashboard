const User = require('../2 - models/User');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.
profile = (req, res)=>{
    User.findOne({ where:{"username":req.query.username}, raw: true })
    .then((user)=>{
        if(user){
            res.send(user);
        }
    });
};

module.exports.
login = (req, res)=>{
    User.findAll({ where:{"username":req.body.username}, raw: true })
    .then(async (users)=>{
        if(users.length == 1){
            const match = await bcrypt.compare(req.body.password, users[0].hash)
            if(match){
                const token = jwt.sign({"id":users[0].id}, process.env.jwt_secret);
                res.json({"user":users[0], "token":token});
            }
            else{ res.json(false); }
        }
        else{ res.send(false); }
    });
};

module.exports.
signup = async (req, res)=>{
    //if username already exists
    const user = await User.findOne({ where: {username:req.body.username} });
    if(user)
        return res.send("exists");
    else{
        const hash = await bcrypt.hash(req.body.password1, 10);
        User.create({"username":req.body.username, "password":req.body.password1, "email":req.body.email, "hash":hash, "photo":(req.PHOTO_PARSED?req.PHOTO_PARSED:'profile.jpg')})
        .then((user)=>{
            const token = jwt.sign({"id":user.id}, process.env.jwt_secret);
            res.send({"username":req.body.username, "photo":(req.PHOTO_PARSED)?req.PHOTO_PARSED:'profile.jpg', "token":token});
        });
    }
};

module.exports.
update = (req, res)=>{
    //if username already exists
    User.findAll({ where: { [Op.and]: [{username:req.body.username},{username:{[Op.ne]:req.body.oldusername}}] } })
    .then(async (users)=>{
        if(users.length > 0){
            return res.send("exists");
        }
        else{
            const photo=(req.PHOTO_PARSED?req.PHOTO_PARSED:'profile.jpg');
            const newUserName = (req.body.username?req.body.username:req.body.oldusername)
            User.update( {"username":newUserName, "firstname":req.body.firstname, "lastname":req.body.lastname, "email":req.body.email, "photo":photo, "templatecolor":req.body.templatecolor}, {where:{"username":req.body.oldusername}} )
            .then(()=>{
                res.send({"username":newUserName, "photo":photo, "templatecolor":req.body.templatecolor});
            });
        }
    })
};

module.exports.
updatePassword = (req, res)=>{
    User.findAll({ where:{"username":req.body.username}, raw: true })
    .then(async (users)=>{
        if(users.length == 1){
            const match = await bcrypt.compare(req.body.password, users[0].hash)
            if(match){
                const hash = await bcrypt.hash(req.body.password1, 10);
                User.update({"password":req.body.password1, "hash":hash}, {where:{"username":req.body.username}} )
                .then((user)=>{
                    const token = jwt.sign({"id":user.id}, process.env.jwt_secret);
                    res.send({"token":token});
                });
            }
            else{ res.send(false); }
        }
        else{ res.send(false); }
    });
};
