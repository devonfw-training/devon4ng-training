function createArray(first: number | string, second: number | string) {
  return [first, second];
}

function createObject(name: string, age?: number) {
  if (Number.isInteger(age)) {
    return { name, age };
  }
  return { name };
}


function findLongestWordFunc(sentence: string): string {
  const reducer = (longestWord: string, currentWord: string): string =>
    longestWord.length < currentWord.length ? currentWord : longestWord;
    
  return sentence.split(/[\s,.:;-]/).reduce(reducer, "");
}

function getElementsGreater(numbers: number[], threshold: number): number[] {
  return numbers.filter((number) => number > threshold);
}

/**
 * Sorts an array of comparable objects.
 *
 * @param list
 * @param ascending
 * @returns
 */
function sort(list: Comparable[], ascending = true) {
  return list.sort((a,b) => ascending ? a.compare(b) : b.compare(a));
}

function reverseFunc(val: number): number {
  return +val.toString().split("").reverse().join("");
}

function parseAndBuild(
  json: string
): { [key: string]: { count: number; allNew: boolean } } {
  const array = JSON.parse(json);
  const result: { [key: string]: { count: number; allNew: boolean } } = {};
  for (const item of array) {
    if (result[item.color]) {
      ++result[item.color].count;
      result[item.color].allNew = result[item.color].allNew && item.isNew;
    } else {
      result[item.color] = {
        count: 1,
        allNew: item.isNew,
      };
    }
  }

  return result;
}
