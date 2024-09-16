const app = require('./1 - configurations/app');

const userRouter = require('./4 - routers/user');
app.use('/user', userRouter);

const eventRouter = require('./4 - routers/event');
app.use('/event', eventRouter);

const employeeRouter = require('./4 - routers/employee');
app.use('/employee', employeeRouter);

app.use((req, res)=>{
    res.status(404).json("404 , no routes !!");
});