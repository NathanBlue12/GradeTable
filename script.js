// Function to add a new course
function addCourse() {
    // Get the input values
    const courseNo = document.getElementById("course-no").value;
    const courseName = document.getElementById("course-name").value;
    const units = document.getElementById("units").value;

    // Get the selected grade from radio buttons
    const gradeRadioButtons = document.getElementsByName("grade");
    let selectedGrade = "";
    for (const radioButton of gradeRadioButtons) {
        if (radioButton.checked) {
            selectedGrade = radioButton.value;
            break;
        }
    }

    // Validate input
    if (courseNo && courseName && units && selectedGrade) {
        // Create a new table row
        const table = document.getElementById("course-table").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(table.rows.length);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        // Insert data into the row
        cell1.innerHTML = courseNo;
        cell2.innerHTML = courseName;
        cell3.innerHTML = units;
        cell4.innerHTML = selectedGrade;

        // Clear the form
        document.getElementById("course-form").reset();

        // Recalculate and display the total QPI
        calculateTotalQPI();
    } else {
        alert("Please fill in all fields including the grade.");
    }
}

// Function to calculate the total QPI
function calculateTotalQPI() {
    const table = document.getElementById("course-table").getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName("tr");
    let totalQPI = 0;
    let totalUnits = 0;

    for (const row of rows) {
        const units = parseFloat(row.cells[2].textContent);
        const grade = row.cells[3].textContent;

        // Calculate QPI based on grade
        let qpi = 0;
        if (grade === "A") {
            qpi = 4.0;
        } else if (grade === "B+") {
            qpi = 3.5;
        } else if (grade === "B") {
            qpi = 3.0;
        } else if (grade === "C+") {
            qpi = 2.5;
        } else if (grade === "C") {
            qpi = 2.0;
        } else if (grade === "D") {
            qpi = 1.0;
        } else if (grade === "F") {
            qpi = 0.0;
        }

        // Calculate total QPI and total units
        totalQPI += qpi * units;
        totalUnits += units;
    }

    // Calculate and display the total QPI
    if (totalUnits > 0) {
        const averageQPI = totalQPI / totalUnits;
        document.getElementById("total-qpi").textContent = averageQPI.toFixed(2);
    } else {
        document.getElementById("total-qpi").textContent = "0.00";
    }
}

// Function to search for a course
function searchCourse() {
    const input = document.getElementById("search-input").value.toUpperCase();
    const table = document.getElementById("course-table");
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const courseNo = rows[i].cells[0].textContent.toUpperCase();
        const courseName = rows[i].cells[1].textContent.toUpperCase();

        if (courseNo.indexOf(input) > -1 || courseName.indexOf(input) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
