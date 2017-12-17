//>>>>>>>>>>>>>>>>>>>>>>>>
// START: Object/Array Manipulation
// Taken from https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
Object.assignDeep = function(jsonObj) {
  // .length of function is 2

  if (jsonObj == null) {
    // TypeError if undefined or null
    throw new TypeError("Cannot convert undefined or null to object");
  }

  var to = Object(jsonObj);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          if (
            typeof to[nextKey] === "object" &&
            to[nextKey] &&
            typeof nextSource[nextKey] === "object" &&
            nextSource[nextKey]
          ) {
            Object.assignDeep(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
};
export function immutableObjectMerge(...jsonObjs) {
  return Object.assign({}, ...jsonObjs);
}
export function immutableObjectDeepMerge(...jsonObjs) {
  return Object.assignDeep({}, ...jsonObjs);
}
export function immutableArrayMerge(array1, array2 = []) {
  return array1.concat(array2);
}
export function omitObject(jsonObj, omitKey) {
  const newObject = immutableObjectMerge(jsonObj);

  if (Array.isArray(omitKey)) {
    for (var i = 0; i < omitKey.length; i++) {
      delete newObject[omitKey[i]];
    }
  } else {
    delete newObject[omitKey];
  }

  return newObject;
}
export function omitArrayItemByIndex(array, arrayIndex) {
  return [...array.slice(0, arrayIndex), ...array.slice(arrayIndex + 1)];
}
// END: Object/Array Manipulation
//<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>
// START: Type checks
export function isFunction(func) {
  return typeof func === "function";
}
export function isUndefined(target) {
  return (
    typeof target === "undefined" ||
    target === undefined ||
    target === "undefined"
  );
}
// END: Type checks
//<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>
// START: String creation/manipulation
export function getUniqueId() {
  return (
    "uid-" + new Date().getTime() + parseInt(Math.random() * 100).toString()
  );
}
export function contains(search, target) {
  return !!~search.indexOf(target);
}
// END: String creation/manipulation
//<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>
// START: Handlers
export function customAddEventListener(
  elem,
  event,
  callback,
  useCapture = false
) {
  if (elem.addEventListener) {
    elem.addEventListener(event, callback, useCapture);
  } else {
    elem.attachEvent(`on${event}`, callback);
  }
}
export function customRemoveEventListener(elem, event, callback) {
  if (elem.removeEventListener) {
    elem.removeEventListener(event, callback);
  } else {
    elem.detachEvent(`on${event}`, callback);
  }
}
// END: Handlers
//<<<<<<<<<<<<<<<<<<<<<<<<
