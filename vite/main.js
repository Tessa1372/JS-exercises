const content = document.getElementById('content');
const studentListLink = document.getElementById('studentListLink');
const studentUpdateLink = document.getElementById('studentUpdateLink');

const api_url = 'http://localhost:3000/students';

async function grabStudents() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) throw new Error('Failed to fetch students.');
        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        alert('Failed to fetch students.');
        return [];
    }
}

async function saveStudentToAPI(student) {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            body: JSON.stringify(student),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) throw new Error('Failed to save student.');
        console.log('Student saved successfully:', await response.json());
    } catch (error) {
        console.error('Error saving student:', error);
        alert('Failed to save student.');
    }
}

async function listStudents() {
    const students = await grabStudents();
    content.innerHTML = students.length === 0 ?
        `<p>No students found. Add a student.</p>` :
        `<table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${students.map(student => `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.grade}</td>
                        <td><button onclick="deleteStudentFromAPI(${student.id})">Delete</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div>
            <form onsubmit="uploadFile(event)">
                <label for="fileInput">Upload File:</label>
                <input type="file" accept=".png" id="fileInput" required>
                <button type="submit">Upload</button>
            </form>
        </div>`;
    highlightActiveLink(studentListLink);
}

async function studentForm() {
    content.innerHTML = `
        <form>
            <label for="studentId">Student ID:</label>
            <input type="number" id="studentId" placeholder="Enter Student ID">
            <label for="studentName">Student Name:</label>
            <input type="text" id="studentName" placeholder="Enter Student Name" required>
            <label for="studentAge">Student Age:</label>
            <input type="number" id="studentAge" placeholder="Enter Student Age" required>
            <label for="studentGrade">Student Grade:</label>
            <input type="text" id="studentGrade" placeholder="Enter Student Grade" required>
            <button type="button" onclick="saveStudent()">Save Student</button>
        </form>`;
    highlightActiveLink(studentUpdateLink);
}

async function saveStudent() {
    const studentId = parseInt(document.getElementById('studentId').value) || null;
    const studentName = document.getElementById('studentName').value;
    const studentAge = parseInt(document.getElementById('studentAge').value) || null;
    const studentGrade = document.getElementById('studentGrade').value;
    
    if (studentName && studentGrade) {
        await saveStudentToAPI({ id: studentId, name: studentName, age: studentAge, grade: studentGrade });
        alert('Student saved successfully!');
        listStudents();
    } else {
        alert('Please fill in all required fields.');
    }
}

async function deleteStudentFromAPI(studentId) {
    try {
        const response = await fetch(`${api_url}/${studentId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete student.');
        console.log('Student deleted successfully:', await response.json());
        listStudents();
    } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student.');
    }
}

async function uploadFile(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files.length) {
        alert('Please select a file to upload.');
        return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    try {
        const response = await fetch('http://localhost:3000/upload', {  
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Failed to upload file.');
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        alert('File uploaded successfully!');

    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
    }
}


function highlightActiveLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

studentListLink.addEventListener('click', (e) => { e.preventDefault(); listStudents(); });
studentUpdateLink.addEventListener('click', (e) => { e.preventDefault(); studentForm(); });

listStudents();
