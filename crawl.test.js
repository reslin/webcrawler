const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
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


test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://abc.def.gh/path/">iuiuiu</a>
    </body
</html>
`
    const inputBaseURL = 'https://abc.def.gh/path/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://abc.def.gh/path/']
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">jhgjhg</a>
    </body
</html>
`
const inputBaseURL = 'https://abc.def.gh'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://abc.def.gh/path/']
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">jhgjhg</a>
    </body
</html>
`
const inputBaseURL = 'https://abc.def.gh'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML abs + relative', () => {
    const inputHTMLBody = `
<html>
    <body>
    <a href="https://abc.def.gh/path1/">iuiuiu</a>
    <a href="/path2/">jhgjhg</a>
    </body
</html>
`

const inputBaseURL = 'https://abc.def.gh'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://abc.def.gh/path1/', 'https://abc.def.gh/path2/']
    expect(actual).toEqual(expected)
})