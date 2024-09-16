const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:5432@localhost/dbname",
    {
        logging: false,//no logs on consol
        define: {createdAt:'createdat', updatedAt:'updatedat'}
    }
);

sequelize.authenticate() //test if "new Sequelize()" connected
.then(()=>{
    console.log("Postgresql Connected.");
})
.catch((err) => {
    console.error('Postgresql connextion error !!');
    console.log(err);
});

module.exports = sequelize;