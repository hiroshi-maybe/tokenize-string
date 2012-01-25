/*
 * example: input = "a bc def ghij k lmno"
 *  "|" describes devide unit below:
 * 1: "a bc def g" | "hij k lmno"
 * 2: "a bc " | "def g" | ["hij k","lmno"]
 * 3: "a " | "bc " | "de" | "f g" | ["hi"|"j k","lm"|"no"]
 * 4: ["a",""] | "b" | "c " | "d" | "e" | ["f","g"] | ["h"|"i"|["j","k"],"l","m"|"n","o"]
 * 5: ["a","b"] | ["c",""] | "de",["f","g"] | ["hi"|["j","k"],"lm"|"no"]
 * 6: ["a","bc",""] | ["def","g"] | [["hij","k"] , "lmno"]
 * 7: ["a","bc","def","g"] | ["hij","k","lmno"]
 * 8: ["a","bc","def","ghij","k","lmno"]
 */

var split = function (input) {
  
  var tree = function _tree(_input) {
    var pivot = Math.floor(_input.length/2),_left,_right
    , merge = function(left,right) {
      var right_head="",result;
      // judge array or not
      // @todo better judge method
      if(left.shift===undefined && right.shift===undefined) {	
        return left+right;
      } else if (left.shift===undefined && !(right.shift===undefined)) {
        right[0]=left+right[0];
        return right;
      } else if (!(left.shift===undefined) && right.shift===undefined) {
        left[left.length-1]+=right;
        return left;
      } else {
        right_head = right.shift();
        result = left.concat(right);
        result[left.length-1]+=right_head;
        return result;
      }
    };

    if (_input.length == 1) {
      return _input===" " ? "" : _input;
    }

    if (_input.charAt(pivot) === " ") {
      if(pivot ===1 && _input.length===2) {
	return [_tree(_input.substr(0,pivot)),""];
      } else {
        // split into array "a b" -> ["a","b"]
        return [_tree(_input.substr(0,pivot)),
                _tree(_input.substr(pivot+1,_input.length-pivot-1))];
      }
    } else {
      _left = _tree(_input.substr(0,pivot));
      _right = _tree(_input.substr(pivot,_input.length-pivot));
      return merge(_left, _right);
    }
  };
  return tree(input);

};

console.log(split("a bc def ghij k lmno"));
