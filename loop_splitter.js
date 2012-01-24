var split = function(input) {
  var i=0, str="", result=[];
  for(;i<input.length; i+=1) {
    if (input.charAt(i)===" ") {
      result.push(str);
      str="";
    } else {
      str+=input.charAt(i);
    }
  }
  result.push(str);
  return result;
};

p(split("ab cd ef"));