console.log("- 3.A -");

const AGE = 40;

const division = (a, b) => {
    if (b == 0) {
        return a;
    } else {
        return a / b;
    }
};

const power = (a, b) => {
    return a ** b;
};

module.exports = {
    division: division,
    power: power,
};

console.log("- 3.B -");

// commonjs :: nodejs
// esm :: modern
