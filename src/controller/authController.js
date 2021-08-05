const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const AppError = require('../utils/appError')
const User = require('../model/userModels')
const common = require('../utils/common')

exports.protect = async (req, res, next) => {
  try {
    // 1) check if the token is there
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return next(new AppError(401, 'fail', 'You are not logged in! Please login in to continue'), req, res, next)
    }
    // 2) Verify token 
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) check if the user is exist (not deleted)
    const user = await User.findOne({
      where: { 
        user_id: decode.user_id
      } 
    })
    if (!user) {
      return next(new AppError(401, 'fail', 'username or pasword not match'), req, res, next)
    }
    req.user = user.dataValues
    next()
  } catch (err) {
    next(err)
  }
}

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_roles)) {
      return next(new AppError(403, 'fail', 'You are not allowed to do this action'), req, res, next)
    }
    next()
  }
}

exports.checkAuth = async (req, res, next) => {
  try {
    if (!req.headers['x-auth'] || req.headers['x-auth'] !== process.env.AUTH_KEY) {
      res.status(401).json({
        code: 401,
        status: 'error',
        msg: 'Access denied. No token provided'
      });
    } else { 
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.signup = async (req, res, next) => {
  let code = 304
  let msg = 'gagal menyimpan data'
  
  try {
    const checkIExistEmail = await User.findOne({
      where: { 
        user_email: req.body.user_email
      } 
    })
    if (checkIExistEmail !== null) {
      code = 409
      msg = 'Email telah terdaftar !!'
    } else {
      const password = await common.generateBcrypt(req.body.user_password)
      const create = await User.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: password,
        user_roles: req.body.user_roles,
        user_phone_number: req.body.user_phone_number
      })
      if (create !== null) {
        code = 201
        msg = 'data berhasil disimpan'
      }
    }
    res.status(201).json({ code: code, msg: msg})
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  let code = 304
  let msg = 'Terjadi kesalahan'
  let dataToken = ''
  try {
    const {
      email,
      password
    } = req.body
    if (!email || !password) {
      code = 203
      msg = 'Email Atau Password tidak boleh kosong'
    } else {
      let dataUser = await User.findOne({
        where: { 
          user_email: email
        } 
      })
      if (dataUser === null) {
        code = 204
        msg = 'Maaf akun belum terdaftar !'
      } else {
        const user = dataUser.dataValues
        if (!user || !await common.verifyPassword(password, user.user_password)) {
          code = 401
          msg = 'Email atau Password tidak sesuai!!'
        } else {
          const data = {
            user_id: user.user_id,
            user_name: user.user_name,
            user_email: user.user_email,
            user_roles: user.user_roles
          }
          const token = await common.createToken(data)
          if (token) {
            msg = 'Berhasil'
            code = 200
            dataToken = token
          }
        }
      }
    }
    res.status(200).json({
      code: code,
      msg: msg,
      data: dataToken
    })
  } catch (err) {
    next(err)
  }
}