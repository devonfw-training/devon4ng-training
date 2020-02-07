function createArray(first, second) {
    // TODO
    return [first, second];
}
function createObject(name, age) {
    // TODO
    if (age) {
        return { name: name, age: age };
    }
    else {
        return { name: name };
    }
}
function reverseFunc(val) {
    // TODO
    return +val.toString().split("").reverse().join("");
}
function findLongestWordFunc(sentence) {
    return sentence
        .split(" ")
        .reduce(function (prev, curre) { return prev.length > curre.length ? prev : curre; });
    //return sentence;
}
function getElementsGreater(numbers, threshold) {
    // TODO
    return numbers.filter(function (item) { return item > threshold; });
}
function parseAndBuild(json) {
    var result = {};
    var jsonParsed = JSON.parse(json);
    jsonParsed.forEach(function (cur) {
        if (!result.hasOwnProperty(cur.color)) {
            result[cur.color] = { count: 0, allNew: true };
        }
        result[cur.color].count = result[cur.color].count + 1;
        if (!cur.isNew) {
            result[cur.color].allNew = false;
        }
    });
    return result;
}
