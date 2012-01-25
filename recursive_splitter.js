var split = function(input) {
  var result = [], last_word="";

  var _rec = function _recursive(input, result) {

    if (input.length===1) {
      return input===" " ? "" : input;
    }

    if ( input.charAt(0) === " ") {
      result.push(_recursive(input.substr(1,input.length-1), result));
      return "";
    } else {
      return input.charAt(0)+_recursive(input.substr(1,input.length-1), result);
    }
  };

  last_word = _rec(input, result);
  if (last_word !== " " && last_word !== "") {
    result.push(last_word);
  }
  return result;
};

console.log(split("ab cd ef"));
