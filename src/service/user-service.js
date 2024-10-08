const UserDAO = require('../dao/user-dao');
const Constant = require('../utils/constant');
const Utility = require('../utils/utility');
const UserService = {
    register: (payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            let data = await UserDAO.isUserExist(payload);
            console.log('data fetched from database based on email', data);
            if (data) {
                reject({ status: 406, message: Constant.MESSAGE.USER.ISEXIST });
            } else {
                UserDAO.register(payload).then(result => {
                    resolve({ status: 201, data: result, message: Constant.MESSAGE.USER.REGISTERED });
                }).catch(error => {
                    reject({ status: 500, message: error });
                })
            }

        })

    },
    login: (payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            let responseData = await UserDAO.isUserExist(payload);
            console.log('data fetched from database based on email', responseData);
            if (!responseData) {
                reject({ status: 406, message: Constant.MESSAGE.USER.NOT_EXIST });
            } else {
                if(responseData.password == payload.password){
                    resolve({status:200,message:Constant.MESSAGE.USER.LOGIN,data:{role:responseData.role,token:Utility.createToken(responseData)}});
                }else{
                    reject({ status: 406, message: Constant.MESSAGE.USER.INVALID_CREDENTIALS });

                }
                
            }

        })

    },
    forgotPassword: (payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            let data = await UserDAO.isUserExist(payload);
            console.log('data fetched from database based on email', data);
            if (!data) {
                reject({ status: 406, message: Constant.MESSAGE.USER.NOT_EXIST });
            } else {
                let OTP = Utility.generateOTP();
                UserDAO.updateOTP(payload, OTP).then(result => {
                    // send either email or in phone the otp ;
                    resolve({ status: 201, data: OTP, message: Constant.MESSAGE.COMMON.UPDATED });
                }).catch(error => {
                    reject({ status: 500, message: error });
                })
            }

        })

    },
    resetPassword: (payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            let data = await UserDAO.verifyOTP(payload);
            console.log('data fetched from database based on email', data);
            if (!data) {
                reject({ status: 406, message: Constant.MESSAGE.USER.INVALID_OTP });
            } else {
                //let OTP = Utility.generateOTP();
                UserDAO.updatePassword(payload).then(result => {
                    // send either email or in phone the otp ;
                    resolve({ status: 201, data: result, message: Constant.MESSAGE.COMMON.UPDATED });
                }).catch(error => {
                    reject({ status: 500, message: error });
                })
            }

        })

    }
}
module.exports = UserService;

