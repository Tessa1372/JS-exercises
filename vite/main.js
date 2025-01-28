// import axios from 'axios';
const content = document.getElementById('content');
const studentListLink = document.getElementById('studentListLink');
const studentUpdateLink = document.getElementById('studentUpdateLink');

function grabStudents() {
    const students = JSON.parse(localStorage.getItem('students'));
    return students || []; 
}

function storeStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

function listStudents() {
    const students = grabStudents();
    if (students.length === 0) {
        content.innerHTML = `<p>Add a student.</p>`;
    } else {
        const table = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(student => `
                        <tr>
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.rank}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        content.innerHTML = table;
    }
    highlightActiveLink(studentListLink);
}

function studentForm() {
    const form = `
        <form>
            <label for="studentId">Student ID:</label>
            <input type="number" id="studentId" placeholder="Enter Student ID" required>
            <label for="studentName">Student Name:</label>
            <input type="text" id="studentName" placeholder="Enter Student Name" required>
            <label for="studentRank">Student Rank:</label>
            <input type="number" id="studentRank" placeholder="Enter Student Rank" required>
            <button type="button" onclick="saveStudent()">Update Student</button>
        </form>
    `;
    content.innerHTML = form;
    highlightActiveLink(studentUpdateLink);
}

function saveStudent() {
    const studentId = parseInt(document.getElementById('studentId').value);
    const studentName = document.getElementById('studentName').value;
    const studentRank = document.getElementById('studentRank').value;

    if (studentId && studentName && studentRank) {
        let students = grabStudents();
        let student = students.find(s => s.id === studentId); 

        if (student) {
            student.name = studentName;
            student.rank = studentRank;
        } else {
            students.push({ id: studentId, name: studentName, rank: studentRank });
        }
        storeStudents(students);
        alert("Student saved successfully!");
        listStudents();
    }
}

function findStudents() {
    const studentId = parseInt(document.getElementById('searchId').value);
    if (studentId) {
        const students = grabStudents();
        const student = students.find(s => s.id === studentId);
        if (student) {
            studentForm();
            document.getElementById('studentId').value = student.id;
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentRank').value = student.rank;
        }
    }
}

function highlightActiveLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

studentListLink.addEventListener('click', (e) => {
    e.preventDefault();
    listStudents();
});

studentUpdateLink.addEventListener('click', (e) => {
    e.preventDefault();
    studentForm();
});

listStudents();
