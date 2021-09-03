/**
 * creates an aray containing the function's parameters as entries
 */
function createArray(first: number|string, second: number|string) {
  // TODO

  return [];
}
/**
 * creates an object containing the function's parameters as properties 
 */
function createObject(name: string, age?: number) {
  // TODO

  return {};
}

/**
 * finds the longest word in the sentence
 */
function findLongestWordFunc(sentence: string): string {
  // TODO

  return sentence;
}

/**
 * returns all numbers of the array that are greater than the threshold
 */
function getElementsGreater(numbers: number[], threshold: number): number[] {
  // TODO

  return numbers;
}

type Comparable = {
  compare(other: Comparable): number;
}

/**
 * Sorts an array of comparable objects.
 *
 * @param list
 * @param ascending
 * @returns
 */
function sort(list: Comparable[], ascending = true): Comparable[] {
  return list;
}

/**
 * reverses the given number. e.g. 1786 -> 6871
 */
 function reverseFunc(val: number): number {
  // TODO

  return val;
}


/**
 * Optional exercise.
 * It counts the number of items per color.
 * Each item has a color and a flag to determine if it is new.
 * The function counts the items per color and checks if all items of a color are new.
 *
 * @param json an array of items in json format
 * @returns
 */
function parseAndBuild(json: string): {[key: string]: {count: number, allNew: boolean}} {
  // TODO

  return {};
}
