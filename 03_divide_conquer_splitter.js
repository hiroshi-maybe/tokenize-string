/*
 * example: input = "a bc def ghij k lmno"
 *  "|" describes divide unit below:
 * 1: "a bc def g" | "hij k lmno"
 * 2: "a bc " | "def g" | ["hij k","lmno"]
 * 3: "a " | "bc " | "de" | "f g" | ["hi"|"j k","lm"|"no"]
 * 4: ["a",""] | "b" | "c " | "d" | "e" | ["f","g"] | ["h"|"i"|["j","k"],"l","m"|"n","o"]
 * 5: ["a","b"] | ["c",""] | "de",["f","g"] | ["hi"|["j","k"],"lm"|"no"]
 * 6: ["a","bc",""] | ["def","g"] | [["hij","k"] , "lmno"]
 * 7: ["a","bc","def","g"] | ["hij","k","lmno"]
 * 8: ["a","bc","def","ghij","k","lmno"]
 */

var isArray = function(obj) {
  return obj.shift !== undefined;
}

var split = function (input) {
  
  var tree = function _tree(_input) {
    var pivot = Math.floor(_input.length/2),_left,_right
    , join_merge = function(left,right) {
      var right_head="",result;
      // judge array or not
      // @todo better judge method
      if(!isArray(left) && !isArray(right)) {
	// "a", "b" -> "ab"
        return left+right;
      } else if (!isArray(left) && isArray(right)) {
	// "a", ["b","c"] -> ["ab","c"]
        right[0]=left+right[0];
        return right;
      } else if (isArray(left) && !isArray(right)) {
	// ["a","b"], "c" -> ["a","bc"]
        left[left.length-1]+=right;
        return left;
      } else {
	// ["a","b"], ["c","d"] -> ["a","bc","d"]
        right_head = right.shift();
        result = left.concat(right);
        result[left.length-1]+=right_head;
        return result;
      }
    }, concat_merge = function(left,right) {
      if(!isArray(left) && !isArray(right)) {
	// "a", "b" -> "[a,b]"
        return [left,right];
      } else if (!isArray(left) && isArray(right)) {
	// "a", ["b","c"] -> ["a","b","c"]
        return [left].concat(right);
      } else if (isArray(left) && !isArray(right)) {
	// ["a","b"], "c" -> ["a","b","c"]
        left.push(right);
        return left;
      } else {
	// ["a","b"], ["c","d"] -> ["a","b","c","d"]
        return left.concat(right);
      }
    };

    if (_input.length == 0) {
      return "";
    }
    else if (_input.length == 1) {
      return _input===" " ? "" : _input;
    }

    if (_input.charAt(pivot) === " ") {
        // "ab cd" -> "ab"|"cd" -> ["ab","cd"]
        return concat_merge(_tree(_input.substr(0,pivot)),
                _tree(_input.substr(pivot+1,_input.length-pivot-1)));
    } else {
      // "abc" -> "a" | "bc" -> "abc"
      _left = _tree(_input.substr(0,pivot));
      _right = _tree(_input.substr(pivot,_input.length-pivot));
      return join_merge(_left, _right);
    }
  };
  return tree(input);

};

console.log(split("a bc def ghij k lmno"));
