function buildEmptyObjectOrArray (objectOrArray) {
  return Array.isArray(objectOrArray) ? [] : {}
}

function defProp (obj, prop, shadow) {
  Object.defineProperty(obj, prop, {
    enumerable:   true,
    configurable: true,
    set:          function (value) { shadow[prop] = value },
    get:          function ()      { return shadow[prop]  }
  })
}

function getValue (obj, shadow, prop, value) {
  defProp(obj, prop, shadow)
  
  if (typeof value !== 'object' && value !== null) return value

  return clone(buildEmptyObjectOrArray(obj), value) 
}

function clone (obj, props) {
  var shadow = buildEmptyObjectOrArray(props)

  for (var prop in props) {
    let value = props[prop]

    shadow[prop] = getValue(obj, shadow, prop, value)
  }

  return shadow
}

function def (obj, props) {
  Object.defineProperty(obj, '__props__', {
    enumerable:   false,
    configurable: false,
    writable:     true,
    value:        clone(obj, props)
  })

  return obj
}

const prop = { def: def }

export default prop
