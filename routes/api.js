'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(ensureInputIsValid, (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};

function ensureInputIsValid(req, res, next) {
  const input = req.query.input;
  const reg = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)(gal|l|mi|km|lbs|kg)$/i;
  if (!reg.test(input)) {
    res.send('invalid unit');
  }
  return next();
}
