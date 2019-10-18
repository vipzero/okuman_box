export function genRandId() {
  const str = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const len = 8

  return Array.from(Array(len))
    .map(() => str[Math.floor(Math.random() * str.length)])
    .join('')
}
