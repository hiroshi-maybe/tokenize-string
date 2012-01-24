var worker = function (str, flash) {
  var result = [];
  return (function() {
    result.push(str);
    if (flash) {
      console.log(result);
    }
  })(str, flash);
};

var split = function(input) {
  var i=0, str="";
  for(;i<input.length; i+=1) {
    if (input.charAt(i)===" ") {
      setTimeout(worker(str), 10);
      str="";
    } else {
      str+=input.charAt(i);
    }
  }
  setTimeout(worker(str, true), 10);
};

p(split("ab cd ef"));