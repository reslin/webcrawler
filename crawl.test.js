const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'http://bla.blabla.com/path'
    const actual = normalizeURL(input)
    const expected = 'bla.blabla.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'http://bla.blabla.com/path/'
    const actual = normalizeURL(input)
    const expected = 'bla.blabla.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL UPPERCASE domain', () => {
    const input = 'http://BLA.blAbla.com/path/'
    const actual = normalizeURL(input)
    const expected = 'bla.blabla.com/path'
    expect(actual).toEqual(expected)
})