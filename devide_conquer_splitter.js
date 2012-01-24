var split = function (input) {

  var tree = function _tree(_input) {

    var pivot = Math.floor(_input.length/2)
    , merge = function(left,right) {
      var i=0,j=1,result=[];
      for(;i<left.length-2; i+=1) {
	result.push(left[i]);
      }
      if(!(left.length==0 && right.length==0)) {
	result.push(left[left.length-1]||""+right[0]||"");
      }      
      for(;j<right.length-2; j+=1) {
	result.push(right[j]);
      }
      return result;
    };

    if (_input.length == 1) {
      return _input===" " ? [] : [_input];
    }

    if (_input.charAt(pivot) === " ") {
      // split into left node and right node.
      if (pivot === 1) {
	return [_tree(_input.substr(0,pivot))];
      } else {
      return [_tree(_input.substr(0,pivot)),
	_tree(_input.substr(pivot+1,_input.length-pivot-1))];	
      }
    } else {
      var _left = _tree(_input.substr(0,pivot));
      var _right = _tree(_input.substr(pivot,_input.length-pivot));
      return merge(_left, _right);  
    }
  };
  return tree(input);
};

p(split("ab cd ef"));