import test from 'ava'
import Struct from './index'

test('should be able to create a Struct with no property at all', async t => {
  const Foo = class extends Struct.new() {}
  const foo = new Foo()
  t.not(foo, undefined)
})

test('should be able to access a defined property', async t => {
  const Foo = class extends Struct.new('value') {}
  const foo = new Foo(123)
  t.deepEqual(foo.value, 123)
})

test('should be able to access more than one property', async t => {
  const Bar = class extends Struct.new('a', 'b') {}
  const bar = new Bar(123, 'abc')
  t.deepEqual(bar.a, 123)
  t.deepEqual(bar.b, 'abc')
})

test('should be able to overwrite the constructor', async t => {
  const Bar = class extends Struct.new('a', 'b') {
    constructor (a, b) {
      super(a, b)
      this.c = 'my-default-value'
    }
  }
  const bar = new Bar(123, 'abc')
  t.deepEqual(bar.a, 123)
  t.deepEqual(bar.b, 'abc')
  t.deepEqual(bar.c, 'my-default-value')
})

test('should not mess up with access using brackets', async t => {
  const Foo = class extends Struct.new('value') {}
  const foo = new Foo(123)
  t.deepEqual(foo['value'], 123)
})

test('should be able to call dig() with a valid property path', async t => {
  const Foo = class extends Struct.new('a') {}
  const foo = new Foo(new Foo({ b: { c: 42 } }))
  t.deepEqual(foo.dig('a', 'a', 'b', 'c'), 42)
})

test('should be get undefined if calling dig() with a invalid property path', async t => {
  const Foo = class extends Struct.new('a') {}
  const foo = new Foo(new Foo({ b: { c: 42 } }))
  t.deepEqual(foo.dig('a', 'b'), undefined)
})

test('should be able to call each() and retrieve the arguments passed', async t => {
  const Foo = class extends Struct.new('a', 'b') {}
  const foo = new Foo('abc', 123)
  let values = []
  foo.each(value => values.push(value))
  t.deepEqual(values, ['abc', 123])
})

test('should be able to call eachPair() and retrieve the parameters and arguments passed', async t => {
  const Foo = class extends Struct.new('a', 'b') {}
  const foo = new Foo('abc', 123)
  let values = []
  foo.eachPair((name, value) => values.push({name, value}))
  t.deepEqual(values, [{ name: 'a', value: 'abc' },
    { name: 'b', value: 123 }])
})

test('should be able to retrieve the length', async t => {
  const Foo = class extends Struct.new('a', 'b', 'c') {}
  const foo = new Foo('abc', 123, 45.6)
  t.deepEqual(foo.length, 3)
})

test('should be able retrieve the members as an array of String containing the parameters', async t => {
  const Foo = class extends Struct.new('a', 'b') {}
  const foo = new Foo('abc', 123)
  t.deepEqual(foo.members, ['a', 'b'])
})

test('should be able to call select() and retrieve the arguments passed', async t => {
  const Foo = class extends Struct.new('a', 'b') {}
  const foo = new Foo('abc', 123)
  let values = []
  foo.select(value => values.push(value))
  t.deepEqual(values, ['abc', 123])
})

test('should be able to retrieve the size', async t => {
  const Foo = class extends Struct.new('a', 'b', 'c') {}
  const foo = new Foo('abc', 123, 45.6)
  t.deepEqual(foo.size, 3)
})

test('should be able to get all values as an array calling toArray()', async t => {
  const Foo = class extends Struct.new('a', 'b') {}
  const foo = new Foo('abc', 123)
  t.deepEqual(foo.toArray(), ['abc', 123])
})

test('should be able to get all values as a map', async t => {
  const Foo = class extends Struct.new('a', 'b') {}
  const foo = new Foo('abc', 123)
  t.deepEqual(foo.toMap(), new Map([['a', 'abc'], ['b', 123]]))
})

test('should be able to get all values as an array', async t => {
  const Foo = class extends Struct.new('a', 'b') {}
  const foo = new Foo('abc', 123)
  t.deepEqual(foo.values, ['abc', 123])
})

test('should be able to access multiple properties by index with valuesAt()', async t => {
  const Foo = class extends Struct.new('a', 'b', 'c', 'd') {}
  const foo = new Foo('abc', 123, 42, 'last')
  t.deepEqual(foo.valuesAt(0, 2), ['abc', 42])
})

test('should be able to access multiple properties by index and name with valuesAt()', async t => {
  const Foo = class extends Struct.new('a', 'b', 'c', 'd') {}
  const foo = new Foo('abc', 123, 42, 'last')
  console.log('here!!!!! ', foo.valuesAt('d', 2, 'a', 1))
  t.deepEqual(foo.valuesAt('d', 2, 'a', 1), ['last', 42, 'abc', 123])
})

test('should be able format as string properly', async t => {
  const Foo = class extends Struct.new('a', 'b', 'c', 'd') {}
  const foo = new Foo('abc', 123, 42, 'last')
  const str = '#<struct Struct::Foo a=abc, b=123, c=42, d=last>'
  t.deepEqual(foo.toString(), str)
})
