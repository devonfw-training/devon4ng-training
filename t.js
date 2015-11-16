var person = (function () {
        var details = {
            firstName: 'John'
        };
        return {
            getFirstName: function () {
                return details.firstName;
            }
        };
    })(),
    HelloCntl = function (person) {
        this.sayHello = function () {
            return 'Hello ' + person.getFirstName() + '!';
        };
    }, helloCntl1;

helloCntl1 = new HelloCntl(person);
console.log(helloCntl1.sayHello());