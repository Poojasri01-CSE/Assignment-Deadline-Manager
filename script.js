let assignments = JSON.parse(
    localStorage.getItem("assignments")
) || [];

function displayAssignments() {

    let list = document.getElementById("assignmentList");

    list.innerHTML = "";

    assignments.forEach((item, index) => {

        let card = document.createElement("div");

        card.className = "assignment-card";

        if (item.completed) {
            card.classList.add("completed");
        }

        let name = document.createElement("h3");
        name.textContent = item.name;

        let subject = document.createElement("p");
        subject.textContent = "Subject: " + item.subject;

        let date = document.createElement("p");
        date.textContent = "Deadline: " + item.deadline;

        let status = document.createElement("p");
        status.textContent = item.completed
            ? "Status: Completed"
            : "Status: Pending";

        let completeBtn = document.createElement("button");
        completeBtn.textContent = item.completed
            ? "Mark Pending"
            : "Mark Completed";

        completeBtn.onclick = function() {
            assignments[index].completed =
                !assignments[index].completed;

            saveData();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";

        deleteBtn.onclick = function() {
            assignments.splice(index, 1);
            saveData();
        };

        card.append(name, subject, date, status,
                    completeBtn, deleteBtn);

        list.appendChild(card);
    });

    document.getElementById("total").textContent =
        assignments.length;

    document.getElementById("pending").textContent =
        assignments.filter(a => !a.completed).length;

    document.getElementById("completed").textContent =
        assignments.filter(a => a.completed).length;
}

function addAssignment() {

    let name = document.getElementById("assignment").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let deadline = document.getElementById("deadline").value;

    if (name === "" || subject === "" || deadline === "") {
        alert("Please fill all the fields!");
        return;
    }

    if (deadline < new Date().toLocaleDateString("en-CA")) {
        alert("Please select a valid deadline!");
        return;
    }

    assignments.push({
        name: name,
        subject: subject,
        deadline: deadline,
        completed: false
    });

    document.getElementById("assignment").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("deadline").value = "";

    saveData();
}

function saveData() {

    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );

    displayAssignments();
}

displayAssignments();