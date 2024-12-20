export const getData = async function (url) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {}
}

export const escapeCode = function (string) {
  try {
    if (typeof string === 'string') {
      const escapeCharacter = ['<', '>', '&']
      const escapeMap = ['&lt;', '&gt;', '&amp;']

      return string
        .split('')
        .map(character => {
          if (escapeCharacter.indexOf(character) === -1) {
            return character
          } else {
            return (character =
              escapeMap[escapeCharacter.indexOf(character)])
          }
        })
        .join('')
    } else {
      return string
    }
  } catch (error) {}
}

export const saveLocalStorage = function (data) {
  try {
    localStorage.setItem('state', JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
}

export const loadLocalStorage = function (object) {
  try {
    const savedState = JSON.parse(localStorage.getItem('state'))
    if (!savedState) return
    Object.assign(object, savedState)
  } catch (error) {
    console.error(error)
  }
}
