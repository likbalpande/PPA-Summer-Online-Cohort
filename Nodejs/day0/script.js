const student = {
    name: "Likhilesh",
    city: "Delhi",
    height: 2,
    weight: 100,
};

const calculateBMI = (obj) => {
    const { height, weight } = obj;

    const bmi = weight / height ** 2;

    setTimeout(() => {
        console.log(bmi);
    }, 10000);
};

calculateBMI(student);
