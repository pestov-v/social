const changeCamelString = (str: string) =>
  firstLetterUpperCase(
    str.split('').map((letter, index) => {
        if (index) {
            if (letter.toUpperCase() === letter) {
                return ` ${letter}`
            }
        }
        return letter
    }).join(''))

const firstLetterUpperCase = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`

type TObj = {
    [key: string]: null | string | number | boolean | object
}
const changeEmptyValues = (obj: TObj) => {
    let outAcc: TObj = {}
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (key === 'photos') {
            acc[key] = value
            return acc
        }
        if (value instanceof Object) {
            acc[key] = changeEmptyValues(value as TObj)
            return acc
        }
        if (value || typeof value === 'boolean') {
            acc[key] = value
            return acc    
        }
        acc[key] = '...'
        return acc
        
    }, outAcc)
}

const twoDigit = (num: number | string): string => {
    if (+num / 10 < 1) {
      return `0${num}`
    }
    return String(num)
  }
  

const unshielding = (str: string): string => str.replace(/&#39;/g, "'")
const shielding = (str: string): string => str.replace(/'/g, "'")

export default {
    firstLetterUpperCase,
    changeCamelString,
    twoDigit,
    changeEmptyValues,
    shielding,
    unshielding
}