// Generate grade icons based on list of grades in salong object
const getSerieOfIconsOnAverageGrade = (grades) => {
    let gradeAverageTemp = 0;

    // Sum all the list of grades to a temporary variable
    grades.forEach((grade) => {
        gradeAverageTemp += grade.grade;
    });

    // Set the average grade based on number of grades in the list
    gradeAverageTemp = gradeAverageTemp / grades.length;

    // Get the integer value of the grade regardless of what the decimal value is
    const gradeAverageInteger = Math.floor(gradeAverageTemp);
    const icons = [];
    let onetimeCheck = true;

    // Build the icons array to store the right fontawesome icon to use in the positions
    for(let i = 0; i < 5; i++) {
        // Load the full stars
        if(gradeAverageInteger > i) {
            icons.push('fa fa-star');
        }
        // Load the half star depending on if it is a decimal value
        else if(gradeAverageTemp !== gradeAverageInteger && onetimeCheck) {
            onetimeCheck = false;
            icons.push('fa fa-star-half-o');
        }
        // Load the empty stars
        else {
            icons.push('fa fa-star-o');
        }
    }

    return icons;
};

export {
    getSerieOfIconsOnAverageGrade
};
