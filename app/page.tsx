"use client";

import { useState } from "react";
import "./globals.css";

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  status: string;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", course: "Computer Science", status: "Active" },
    { id: 2, name: "Priya Patil", email: "priya@gmail.com", course: "Information Technology", status: "Active" },
    { id: 3, name: "Amit Kumar", email: "amit@gmail.com", course: "Electronics", status: "Active" },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Computer Science");
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("Dashboard");

  const addStudent = () => {
    if (!name.trim() || !email.trim()) {
      alert("Please enter student name and email");
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name,
      email,
      course,
      status: "Active",
    };

    setStudents([...students, newStudent]);
    setName("");
    setEmail("");
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <aside className="sidebar">
        <h2>🎓 Education Management</h2>
        <p className="menu-title">MAIN MENU</p>

        {["Dashboard", "Students", "Attendance", "Courses", "Fees", "Reports"].map((item) => (
          <button
            key={item}
            className={section === item ? "menu active" : "menu"}
            onClick={() => setSection(item)}
          >
            {item === "Dashboard" ? "▦" :
             item === "Students" ? "♙" :
             item === "Attendance" ? "✓" :
             item === "Courses" ? "▤" :
             item === "Fees" ? "₹" : "▥"}
            &nbsp; {item}
          </button>
        ))}

        <div className="sidebar-bottom">
          <p>Student Management</p>
          <small>Version 1.0.0</small>
        </div>
      </aside>

      <main className="main">

        <header className="topbar">
          <div>
            <h2>{section}</h2>
            <p>Welcome to your student management system</p>
          </div>
          <div className="profile">
            <span>👤</span>
            <div>
              <b>Admin</b>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        {section === "Dashboard" && (
          <>
            <h3 className="heading">Dashboard Overview</h3>

            <div className="stats">
              <div className="stat">
                <span>Total Students</span>
                <h1>{students.length}</h1>
                <small>Registered students</small>
              </div>

              <div className="stat">
                <span>Active Students</span>
                <h1>{students.filter(s => s.status === "Active").length}</h1>
                <small>Currently active</small>
              </div>

              <div className="stat">
                <span>Total Courses</span>
                <h1>4</h1>
                <small>Available courses</small>
              </div>

              <div className="stat">
                <span>Attendance</span>
                <h1>92%</h1>
                <small>Overall attendance</small>
              </div>
            </div>

            <div className="panel">
              <h3>Recent Students</h3>
              <StudentTable
                students={students.slice(-5).reverse()}
                onDelete={deleteStudent}
              />
            </div>
          </>
        )}

        {section === "Students" && (
          <>
            <h3 className="heading">Student Management</h3>

            <div className="panel">
              <h3>Add New Student</h3>

              <div className="form">
                <input
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Electronics</option>
                  <option>Mechanical Engineering</option>
                </select>

                <button className="add-btn" onClick={addStudent}>
                  + Add Student
                </button>
              </div>
            </div>

            <div className="panel">
              <div className="table-heading">
                <h3>All Students</h3>
                <input
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <StudentTable
                students={filteredStudents}
                onDelete={deleteStudent}
              />
            </div>
          </>
        )}

        {section === "Attendance" && (
          <div className="panel">
            <h3>Attendance Management</h3>
            <p>Mark attendance for registered students.</p>
            {students.map((student) => (
              <AttendanceRow key={student.id} student={student} />
            ))}
          </div>
        )}

        {section === "Courses" && (
          <div className="panel">
            <h3>Available Courses</h3>
            {["Computer Science", "Information Technology", "Electronics", "Mechanical Engineering"].map((c) => (
              <p className="course-item" key={c}>📚 {c}</p>
            ))}
          </div>
        )}

        {section === "Fees" && (
          <div className="panel">
            <h3>Fee Management</h3>
            <p>Fee management section</p>
            <p>Connect your database to manage actual student payments.</p>
          </div>
        )}

        {section === "Reports" && (
          <div className="panel">
            <h3>Student Reports</h3>
            <h2>Total Registered Students: {students.length}</h2>
            <button className="add-btn" onClick={() => window.print()}>
              Print Report
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

function StudentTable({
  students,
  onDelete,
}: {
  students: Student[];
  onDelete: (id: number) => void;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id.toString().slice(-5)}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td><span className="status">{s.status}</span></td>
              <td>
                <button className="delete-btn" onClick={() => onDelete(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr><td colSpan={6}>No students found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function AttendanceRow({ student }: { student: Student }) {
  const [attendance, setAttendance] = useState("Not Marked");

  return (
    <div className="attendance-row">
      <b>{student.name}</b>
      <select
        value={attendance}
        onChange={(e) => setAttendance(e.target.value)}
      >
        <option>Not Marked</option>
        <option>Present</option>
        <option>Absent</option>
      </select>
    </div>
    
  );
}
