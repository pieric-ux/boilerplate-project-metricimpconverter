const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('Number Assertions', function() {
    
    test('Whole Number', function() {
      assert.equal(convertHandler.getNum('4gal'), 4);
    });

    test('Decimal Number', function() {
      assert.equal(convertHandler.getNum('3.1mi'), 3.1);
    });

    test('Fractional Number', function() {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
    });

    test('Fractional Number with Decimal', function() {
      assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
    });

    test('Double Fraction', function() {
      assert.equal(convertHandler.getNum('3/2/3gal'), undefined);
    });

    test( 'No Numeric', function() {
      assert.equal(convertHandler.getNum('gal'), 1);
    });
    
  });
  suite('Unit Assertions', function() {

    test('Valid Unit', function() {
      assert.equal(convertHandler.getUnit('4Gal'), 'gal');
      assert.equal(convertHandler.getUnit('4l'), 'L');
      assert.equal(convertHandler.getUnit('4kM'), 'km');
      assert.equal(convertHandler.getUnit('4MI'), 'mi');
      assert.equal(convertHandler.getUnit('4lBs'), 'lbs');
      assert.equal(convertHandler.getUnit('4kG'), 'kg');
    });

    test('Invalid Unit', function() {
      assert.equal(convertHandler.getUnit('4g'), undefined);
      assert.equal(convertHandler.getUnit('4miles'), undefined);
    });

    test('Return Unit', function() {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });

    test('Spelled-out Unit', function() {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });

  });
  suite('Conversion Assertions', function() {
    test('gal to L', function () {
      assert.equal(convertHandler.convert(4, 'gal'), 15.14164);
    });

    test('L to gal', function () {
      assert.equal(convertHandler.convert(4, 'L'), 1.05669);
    });

    test('mi to km', function () {
      assert.equal(convertHandler.convert(4, 'mi'), 6.43736);
    });

    test('km to mi', function () {
      assert.equal(convertHandler.convert(4, 'km'), 2.48549);
    });

    test('lbs to kg', function () {
      assert.equal(convertHandler.convert(4, 'lbs'), 1.81437);
    });

    test('kg to lbs', function () {
      assert.equal(convertHandler.convert(4, 'kg'), 8.81850);
    });

  });
});