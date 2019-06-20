const getSerieOfIconsOnAverageGrade = (grades) => {
    let gradeAverageTemp = 0;

    grades.forEach((grade) => {
        gradeAverageTemp += grade.grade;
    });

    gradeAverageTemp = gradeAverageTemp / grades.length;

    const gradeAverageInteger = Math.floor(gradeAverageTemp);
    const icons = [];
    let onetimeCheck = true;

    for(let i = 0; i < 5; i++) {
        if(gradeAverageInteger > i) {
            icons.push('fa fa-star');
        }
        else if(gradeAverageTemp !== gradeAverageInteger && onetimeCheck) {
            onetimeCheck = false;
            icons.push('fa fa-star-half-o');
        }
        else {
            icons.push('fa fa-star-o');
        }
    }

    return icons;
};

export {
    getSerieOfIconsOnAverageGrade
};
