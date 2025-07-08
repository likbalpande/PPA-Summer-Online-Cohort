console.log("- 2.A -");
const { power, division } = require("./maths_helper");
console.log("- 2.B -");

const AGE = 30;
const calculateBMI = (obj) => {
    const { height, weight } = obj;

    const heightSq = power(height, 2);
    const bmi = division(weight, heightSq);

    setTimeout(() => {
        console.log(bmi);
    }, 2000);
};

module.exports = calculateBMI;
console.log("- 2.C -");
