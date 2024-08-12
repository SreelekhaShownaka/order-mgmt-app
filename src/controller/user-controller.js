const express = require('express');
const UserService = require('../service/user-service');
const route = express.Router();
const CustomResponse = require('../utils/custom-response');


route.post('/create', (req, res) => {
    let payloadData = req.body;
    console.log('data inside controller', payloadData);
    UserService.register(payloadData).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})

route.post('/login', (req, res) => {
    let payloadData = req.body;
    console.log('data inside controller', payloadData);
    UserService.login(payloadData).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})


route.post('/forgotPassword', (req, res) => {
    let payloadData = req.body;
    console.log('data inside controller', payloadData);
    UserService.forgotPassword(payloadData).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})



route.post('/resetPassword', (req, res) => {
    let payloadData = req.body;
    console.log('data inside controller', payloadData);
    UserService.resetPassword(payloadData).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})


module.exports = route;