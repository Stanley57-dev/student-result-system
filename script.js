let historyList = JSON.parse(localStorage.getItem("results")) || [];
displayHistory();

function addSubject() {
    const container = document.getElementById("subjects-container");
    const div = document.createElement("div");
    div.className = "subject-row";
    div.innerHTML = `
        <input type="text" class="subject-name" placeholder="Subject Name">
        <input type="number" class="subject-score" placeholder="Score">
    `;
    container.appendChild(div);
}

function generateResult() {
    const name = document.getElementById("name").value;
    const matric = document.getElementById("matric").value;

    const subjectNames = Array.from(document.getElementsByClassName("subject-name"));
    const subjectScores = Array.from(document.getElementsByClassName("subject-score"));

    let subjects = [];
    let total = 0;
    for (let i = 0; i < subjectNames.length; i++) {
        let subName = subjectNames[i].value;
        let score = Number(subjectScores[i].value);
        if (!subName || isNaN(score)) {
            alert("Please fill in all subjects correctly");
            return;
        }
        subjects.push({name: subName, score});
        total += score;
    }

    let average = total / subjects.length;

    let grade = "";
    if (average >= 70) grade = "A";
    else if (average >= 60) grade = "B";
    else if (average >= 50) grade = "C";
    else if (average >= 45) grade = "D";
    else grade = "F";

    let status = average >= 45 ? "Pass" : "Fail";

    // Display result
    let resultHTML = `<strong>Name:</strong> ${name}<br>
                      <strong>Matric No:</strong> ${matric}<br>
                      <strong>Results:</strong><br>`;
    subjects.forEach(sub => {
        resultHTML += `${sub.name}: ${sub.score}<br>`;
    });
    resultHTML += `<strong>Total:</strong> ${total}<br>
                   <strong>Average:</strong> ${average.toFixed(2)}<br>
                   <strong>Grade:</strong> ${grade}<br>
                   <strong>Status:</strong> 
                   <span class="${status === "Pass" ? "pass" : "fail"}">${status}</span>`;

    document.getElementById("result").innerHTML = resultHTML;

    // Save history
    const record = {name, matric, subjects, total, average, grade, status};
    historyList.push(record);
    localStorage.setItem("results", JSON.stringify(historyList));
    displayHistory();
}

function displayHistory() {
    const history = document.getElementById("history");
    history.innerHTML = "";
    historyList.forEach((item, index) => {
        let subjText = item.subjects.map(s => `${s.name}: ${s.score}`).join(", ");
        history.innerHTML += `
            <li>
                ${index + 1}. ${item.name} (${item.matric}) - ${subjText} - 
                Grade: ${item.grade} (${item.status})
            </li>
        `;
    });
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("matric").value = "";
    document.getElementById("subjects-container").innerHTML = `
        <div class="subject-row">
            <input type="text" class="subject-name" placeholder="Subject Name">
            <input type="number" class="subject-score" placeholder="Score">
        </div>
    `;
    document.getElementById("result").innerHTML = "";
}