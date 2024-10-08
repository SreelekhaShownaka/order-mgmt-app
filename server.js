const express = require('express');
const app = express();

const Constant = require('./src/utils/constant');
const bodyParser = require('body-parser');
const UserDAO = require('./src/dao/user-dao');
app.use(bodyParser.json());
app.use(express.static('public'));

require('./database');



app.use('/register',(req,res)=>{
    res.sendFile(__dirname+'/public/register.html');
})
app.use('/customerHome',(req,res)=>{
    res.sendFile(__dirname+'/public/customerHome.html');

})
app.use('/home',(req,res)=>{
    res.sendFile(__dirname+'/public/home.html');

})
app.use('/chefHome',(req,res)=>{
    res.sendFile(__dirname+'/public/chefHome.html');

})
app.use('/admin',(req,res)=>{
    res.sendFile(__dirname+'/public/admin.html');

})
app.use('/adminOrderDetail',(req,res)=>{
    res.sendFile(__dirname+'/public/orderDetailAdmin.html');

})
app.use('/customerDishDetail',(req,res)=>{
    res.sendFile(__dirname+'/public/customerDishDetail.html');

})
app.use('/dishDetail',(req,res)=>{
    res.sendFile(__dirname+'/public/dishDetail.html');

})
app.use('/cartDetail',(req,res)=>{
    res.sendFile(__dirname+'/public/cart.html');

})
app.use('/order',(req,res)=>{
    res.sendFile(__dirname+'/public/order.html');

})
app.use('/orderDetail',(req,res)=>{
    res.sendFile(__dirname+'/public/orderDetail.html');

})
app.use('/users',require('./src/controller/user-controller'));
app.use('/dishes',require('./src/controller/dishes-controller'));
app.use('/carts',require('./src/controller/cart-controller'));
app.use('/orders',require('./src/controller/order-controller'));

app.use('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');

})


UserDAO.isUserExist({"email":"sandy@gmail.com"}).then(result=>{
if(result)
console.log('Admin already registered');
else{
    UserDAO.register({
        "name":"Sandeep",
        "email":"sandy@gmail.com",
        "password":"asdf1234",
        "role":"ADMIN",
        "address":"NEPAL",
        "phone":"76768686878"
    }).then(response=>{
        console.log('Admin Registered successfully');
    })
}

})


app.listen(Constant.PORT,()=>{
    console.log(`Listening to port ${Constant.PORT}`);
})