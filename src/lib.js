import { alphabet, base } from './constants'

export function encode (i) {  
  if (i == 0) {
    return alphabet[0]
  }

  const s = []
  
  while (i > 0) {
    s.push(alphabet[i % base])
    i = Math.floor(i / base)
  }

  return s.reverse().join('')
}

export function decode (s) {
  let decoded = 0

  while (s) {
    const index = alphabet.indexOf(s[0])
    const power = s.length - 1
    decoded += index * Math.pow(base, power)
    s = s.substring(1)
  }

  return decoded
}
