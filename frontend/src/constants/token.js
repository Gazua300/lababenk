const startToken = Math.random().toString(36).substr(2)
const middleToken = Math.random().toString(36).substr(2)
const additional = Math.random().toString(36).substr(2)
const endToken = Math.random().toString(36).substr(2)
const readyToken = startToken+middleToken+additional+endToken


export const token = readyToken