var worker = function () {
  var result = [];
  return function(chunk, flash) {
    result = result.concat(chunk);
    if (flash) {
      console.log(result);
    }
  };
};

var chunker = function () {
  var _worker = worker(), chunksize=3,chunk_holder=[];
  return function(input, flash) {
    // buffering
    chunk_holder.push(input);
    if (flash || chunk_holder.length === chunksize){
      _worker(chunk_holder, flash);
      chunk_holder=[];
    }
  };
};

var split = function(input) {
  var i=0, str="", _chunker=chunker();
  for(;i<input.length; i+=1) {    
    if (input.charAt(i)===" ") {      
      // async
      setTimeout(_chunker(str), 1);
      str="";
    } else {      
      str+=input.charAt(i);
    }
  }
  // async
  setTimeout(_chunker(str,true), 1);
};

split("a bc def ghij klmno pqrstu z");
