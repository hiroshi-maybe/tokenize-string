var worker = function(chunk) {
  return function(){
    console.log(chunk); 
  };
};

var chunker = function () {
  var chunksize=3,chunk_holder=[], chunk_i=0;
  return function(input, flush) {
    // buffering
    chunk_holder.push(input);
    if (flush || chunk_holder.length === chunksize){
      setTimeout(worker(chunk_holder), chunk_i*1000);
      chunk_i += 1;
      chunk_holder=[];
    }
  };
};

var split = function(input) {
  var i=0, str="", _chunker=chunker();
  for(;i<input.length; i+=1) {
    if (input.charAt(i)===" ") {
      // async
      _chunker(str);
      str="";
    } else {      
      str+=input.charAt(i);
    }
  }
  // async
  _chunker(str,true);
};

split("a bc def ghij klmno pqrstu z");
