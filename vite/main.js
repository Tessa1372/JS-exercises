const content = document.getElementById('content');
const studentListLink = document.getElementById('studentListLink');
const studentUpdateLink = document.getElementById('studentUpdateLink');

const api_url = 'http://localhost:3000/students'; 

async function grabStudents() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) throw new Error('Failed to fetch students.');
        const students = await response.json();
        return students;
    } catch (error) {
        console.error('Error fetching students:', error);
        alert('Failed to fetch students.');
        return [];
    }

}

function saveStudentToAPI(student) {
  const method = 'POST'
  fetch(api_url, {
      method: method,
      body: JSON.stringify(student),
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      }
  })

  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to save student.');
      }
      return response.json();
  })

  .then(data => console.log('Student saved successfully:', data))

  .catch(error => {
      console.error('Error saving student:', error);
      alert('Failed to save student.');
  });
}


async function listStudents() {
    const students = await grabStudents();
    if (students.length === 0) {
        content.innerHTML = `<p>No students found. Add a student.</p>`;
    } else {
        const table = `
      <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
        </tr>
    </thead>
    <tbody>
        ${students.map((student) => `
            <tr>
                <td>
                    ${student.id}
                    <button onclick="deleteStudentFromAPI(${student.id})">Delete</button>
                </td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
            </tr>
        `).join('')}
    </tbody>
</table>

        `;
        content.innerHTML = table;
    }
    highlightActiveLink(studentListLink);
}

async function studentForm() {
    const form = `
        <form>
            <label for="studentId">Student ID:</label>
            <input type="number" id="studentId" placeholder="Enter Student ID">
            <label for="studentName">Student Name:</label>
            <input type="text" id="studentName" placeholder="Enter Student Name" required>
            <label for="studentage">Student Age:</label>
            <input type="number" id="studentage" placeholder="Enter Student Age" required>
            <label for="studentgrade">Student Grade:</label>
            <input type="text" id="studentgrade" placeholder="Enter Student Grade" required>
            <button type="button" onclick="saveStudent()">Save Student</button>
        </form>
    `;
    content.innerHTML = form;
    highlightActiveLink(studentUpdateLink);
}

async function saveStudent() {
    const studentId = parseInt(document.getElementById('studentId').value); 
    const studentName = document.getElementById('studentName').value;
    const studentAge = parseInt(document.getElementById('studentage').value);
    const studentGrade = document.getElementById('studentgrade').value;

    if (studentName && studentGrade) {
        const student = { id: studentId, name: studentName, age: studentAge, grade:studentGrade }; 
        await saveStudentToAPI(student);
        alert('Student saved successfully!');
        listStudents();
    } else {
        alert('Please fill in all required fields.');
    }
}

async function deleteStudentFromAPI(studentId) {
  try {
      const response = await fetch(`${api_url}/${studentId}`, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json; charset=UTF-8"
          }
      });

      if (!response.ok) {
          throw new Error('Failed to delete student.');
      }

      const data = await response.json();
      console.log('Student deleted successfully:', data);
      listStudents();  

  } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student.');
  }
}


async function highlightActiveLink(activeLink) {
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
