export const getData = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const escapeCode = function (string) {
  try {
    if (typeof string === "string") {
      const escapeCharacter = ["<", ">", "&"];
      const escapeMap = ["&lt;", "&gt;", "&amp;"];

      return string
        .split("")
        .map((character) => {
          if (escapeCharacter.indexOf(character) === -1) {
            return character;
          } else {
            return (character = escapeMap[escapeCharacter.indexOf(character)]);
          }
        })
        .join("");
    } else {
      return string;
    }
  } catch (error) {}
};
