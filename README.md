# struct-class [![Build Status](https://travis-ci.org/helton/struct-class.svg?branch=master)](https://travis-ci.org/helton/struct-class)

> :construction: Struct class from [Ruby](https://ruby-doc.org/core-2.3.0/Struct.html) to JavaScript

**Struct** acts like a normal custom user-created class, but provides some nice default functionality and shortcuts when you don't need a full-fledged class.

## Install

### NPM
```sh
$ npm install struct-class --save
```

### Yarn
```sh
$ yarn add struct-class
```

## Usage

```js
import Struct from 'struct-class'

class Account extends Struct.new('owner', 'balance') {}

const account = new Account('Helton', 12345.67)

console.log(account) 
// => #<struct Struct::Account owner=Helton, balance=12345.67>
```

## API

All the methods below (but the `Struct.new`, which is *static*) are *instance methods* or *attributes/properties*.

### Struct.new (...parameters)

Return Type:  `class`

> Returns a class with a default constructor using all the parameters provided.

### dig (...keys)

Return Type:  `any`

> Extracts the nested value specified by the sequence of *key* objects by calling `dig` at each step, returning `undefined` if any intermediate step is `undefined`.

### each (fn)

Return Type:  `void`

> Iterates over the struct members, returning their property names.

### eachPair (fn)

Return Type:  `void`

> Iterates over the struct members, returning their property names and values

### inspect ()

Return Type:  `string`

> Describes the contents of the struct in a string.

### length

*Attribute*
Return Type:  `number`

> Returns the number of struct members.

### members

*Attribute*
Return Type:  `Array[string]`

> Returns the struct members as an array of `string`.

### select (fn)

Return Type:  `void`

> Iterates over the struct members, returning their property names.

### size

*Attribute*
Return Type:  `number`

> Returns the number of struct members.

### toString ()

Return Type:  `string`

> Describes the contents of the struct in a `string`.

### toArray ()

Return Type:  `Array[any]`

> Returns the values for this struct as an `Array`.

### toMap ()

Return Type:  `Map[string => any]`

> Returns the values for this struct as a `Map`.

### values

*Attribute*
Return Type:  `Array[any]`

> Returns the values for this struct as an `Array`.

### valuesAt (....selectors)

Return Type:  `Array[any]`

> Returns the struct member values for each selector as an Array. A selector should be a `number` or a `string` representing the property name.

## License

MIT © [Helton Carlos de Souza](http://helton.me)