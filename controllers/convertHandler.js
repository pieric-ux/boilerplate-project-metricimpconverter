
function splitInputNumericString(input) {
  
  const numeric = (input.match(/[\d.\/]+/g) ?? ['1'])[0];
  const string = input.match(/[a-zA-Z]+/g)[0];
  
  return [numeric, string];
}

function checkDoubleFraction(numeric) {
  const fractions = numeric.split('/');
  if(fractions.length > 2) {
    return undefined;
  }
  return numeric;
}

function ConvertHandler() {

  this.getNum = function(input) {
    const numeric = splitInputNumericString(input)[0];
    let result = checkDoubleFraction(numeric);
    
    return eval(result);
  };
  
  this.getUnit = function(input) {
    const string = splitInputNumericString(input)[1];
    switch (string.toLowerCase()) {
      case 'gal':
        result = 'gal';
        break;
      case 'l':
        result = 'L';
        break;
      case 'lbs':
        result = 'lbs';
        break;
      case 'kg':
        result = 'kg';
        break;
      case 'mi':
        result = 'mi';
        break;
      case 'km':
        result = 'km';
        break;
      default:
        result = undefined;
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l': 
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit == 'gal' || initUnit.toLowerCase() == 'l') {
      result = initUnit == 'gal' ? (initNum * galToL) : (initNum / galToL);
      
    } else if (initUnit == 'lbs' || initUnit == 'kg') {
      result = initUnit == 'lbs' ? initNum * lbsToKg : initNum / lbsToKg;
      
    } else if (initUnit == 'mi' || initUnit == 'km') {
      result = initUnit == 'mi' ? initNum * miToKm : initNum / miToKm;
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${parseFloat(returnNum).toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
