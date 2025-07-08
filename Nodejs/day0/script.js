// "internal :: node", "** user/developer defined **", "external :: express"

console.log("- 1.A -");
const bmi = require("./bmi_helper");
console.log("- 1.B -");
// const { division } = require("./maths_helper");
console.log("- 1.C -");

const student = {
    name: "Likhilesh",
    city: "Delhi",
    height: 2,
    weight: 100,
};

bmi(student);

// console.log(division(33, 11));

// whenever you require (resolution / execution is done synchronous)
// 1.A --> 2.A --> 3.A --> 3.B --> 2.B --> 2.C --> 1.B --> (caching) --> 1.C
