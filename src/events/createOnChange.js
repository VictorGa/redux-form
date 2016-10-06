import getValue from './getValue'
import isReactNative from '../isReactNative'

const createOnChange = (change, { after, parse, normalize } = {}) =>
  event => {
    // read value from input
    let value = getValue(event, isReactNative)

    // parse value if we have a parser
    if (parse) {
      value = parse(value)
    }

    // normalize value
    if (normalize) {
      value = normalize(value)
    }

    // dispatch change action
    change(value)

  // call after callback
  if (after) {
    after(value)
  }
  }

export default createOnChange
