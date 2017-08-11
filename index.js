class Struct {
  static new (...params) {
    return class {
      constructor (...args) {
        params.forEach((param, i) => (this[param] = args[i]))
      }

      dig (...keys) {
        return keys.reduce((prev, next) => prev[next], this)
      }

      each (fn) {
        params.forEach(name => fn(this[name]))
      }

      eachPair (fn) {
        params.forEach(name => fn(name, this[name]))
      }

      inspect () {
        return this.toString()
      }

      get length () {
        return params.length
      }

      get members () {
        return params
      }

      select (fn) {
        return this.each(fn)
      }

      get size () {
        return this.length
      }

      toString () {
        return `#<struct Struct::${this.constructor.name} ${objectToString(this)}>`
      }

      toArray () {
        return Array.from(params.map(name => this[name]))
      }

      toMap () {
        return new Map(params.map(name => [name, this[name]]))
      }

      get values () {
        return this.toArray()
      }

      valuesAt (...selectors) {
        const values = this.toArray()
        return selectors.map(selector => typeof selector === 'number' ? values[selector] : this[selector])
      }
    }
  }
}

function objectToString (object) {
  return Object.getOwnPropertyNames(object)
    .map(name => `${name}=${object[name]}`)
    .join(', ')
}

module.exports = Struct
