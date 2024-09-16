const Employee = require('../2 - models/Employee');
const Event = require('../2 - models/Event');
const {Op,fn,col,literal} = require('sequelize');

module.exports.
get = (req, res)=>{
    const whereClause = {title:{[Op.like]:'%'+req.query.title+'%'}, start:{[Op.like]:req.query.month+'%'}};
    let x;
    Event.findAndCountAll({
        where: whereClause,
        limit: parseInt(req.query.limit),
        offset:parseInt(req.query.skip),
        order: [['id', 'DESC']],
        include:Employee,
        distinct: true
    })
    .then((data)=>{
        x = {"rows":data.rows, "total":data.count}
        return Event.findAll({
            where: whereClause,
            attributes: ['domain', [fn('sum', col('profit')), 'sum']],
            group: ['domain']
        })
    })
    .then((data)=>{
        x.profits = [data[0],data[1],data[2],data[3]]
        res.json(x)
    })
};

module.exports.
getYearProfits = (req, res)=>{
    Event.findAll({
        where: {start:{[Op.like]:req.query.year+'%'}},
        attributes: [
            [literal(`
                CASE
                WHEN SUBSTRING(start, 1, 7) = '2024-01' THEN '1'
                WHEN SUBSTRING(start, 1, 7) = '2024-02' THEN '2'
                WHEN SUBSTRING(start, 1, 7) = '2024-03' THEN '3'
                WHEN SUBSTRING(start, 1, 7) = '2024-04' THEN '4'
                WHEN SUBSTRING(start, 1, 7) = '2024-05' THEN '5'
                WHEN SUBSTRING(start, 1, 7) = '2024-06' THEN '6'
                WHEN SUBSTRING(start, 1, 7) = '2024-07' THEN '7'
                WHEN SUBSTRING(start, 1, 7) = '2024-08' THEN '8'
                WHEN SUBSTRING(start, 1, 7) = '2024-09' THEN '9'
                WHEN SUBSTRING(start, 1, 7) = '2024-10' THEN '10'
                WHEN SUBSTRING(start, 1, 7) = '2024-11' THEN '11'
                WHEN SUBSTRING(start, 1, 7) = '2024-12' THEN '12'
                ELSE 'Other' END`), 
            'month'],
            'domain',
            [fn('sum', col('profit')), 'sumprofit'],
            [fn('count', col('id')), 'count']
        ],
        group: [fn('substring', col('start'), 1, 7), 'domain'],
        order: [[literal('month'), 'ASC']]
    })
    .then((data)=>{
        res.send(data)
    })
};

module.exports.
post = (req, res)=>{
    let id;
    Event.create({"title":req.body.title, "description":req.body.description, "start":req.body.start, "end":req.body.start, "domain":req.body.domain, "completion":req.body.completion, "profit":req.body.profit})
    .then((entry)=>{
        id = entry.id;
        return entry.setEmployees(req.body.employee)
    }).then(()=>{
        res.json({"newId":id});
    });
};

module.exports.
put = (req, res)=>{
    Event.update({"title":req.body.title, "description":req.body.description, "start":req.body.start, "end":req.body.start, "domain":req.body.domain, "completion":req.body.completion, "profit":req.body.profit}, {where:{id: req.params.id}})
    .then(()=>{
        res.json({"editedId":req.params.id});
    });
};

module.exports.
setAssociations = (req, res)=>{
    Event.findOne({
        where:{id: req.params.id},
    })
    .then((event)=>{
        return event.setEmployees(req.body.associations)
    })
    .then(()=>{
        res.json({"id":req.params.id});
    })
}

module.exports.
remove = (req, res)=>{
    Event.destroy({where:{id: req.params.id}})
    .then(()=>{
        res.json({"deletedId":req.params.id});
    });
};