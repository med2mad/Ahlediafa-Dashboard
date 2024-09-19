const Employee = require('../2 - models/Employee');
const Event = require('../2 - models/Event');
const {Op} = require('sequelize');

module.exports.
get = (req, res)=>{
    const whereClause = {name: {[Op.like]:'%'+req.query.name+'%'}};

    Employee.findAndCountAll({
        where: whereClause,
        limit: parseInt(req.query.limit),
        offset:parseInt(req.query.skip),
        order: [['id', 'DESC']],
        include:Event,
        distinct: true
    })
    .then((data)=>{
        res.json({"rows":data.rows, "total":data.count});
    });
};

module.exports.
post = (req, res)=>{
    Employee.create({"name":req.body.name, "phone":req.body.phone, "role":req.body.role, "availability":req.body.availability, "photo":req.PHOTO_PARSED})
    .then((entry)=>{
        res.json({"newId":entry.id, "photo":req.PHOTO_PARSED});
    });
};

module.exports.
put = (req, res)=>{
    Employee.update({"name":req.body.name, "phone":req.body.phone, "role":req.body.role, "availability":req.body.availability, "photo":req.PHOTO_PARSED}, {where:{id: req.params.id}})
    .then(()=>{
        res.json({"editedId":req.params.id, "photo":req.PHOTO_PARSED});
    });
};

module.exports.
remove = (req, res)=>{
    Employee.destroy({where:{id: req.params.id}})
    .then(()=>{
        res.json({"deletedId":req.params.id});
    });
};