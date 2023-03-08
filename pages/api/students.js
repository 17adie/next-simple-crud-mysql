import { query } from "@/lib/db"

export default async function handler(req, res) {
  let message, status

  if (req.method === "GET") {
    const students = await query({
      query: "SELECT * FROM student_tbl ORDER BY tbl_id DESC",
      values: [],
    })
    res.status(200).json({ students: students })
  }

  if (req.method === "POST") {
    const { firstName, middleName, lastName } = req.body
    const addStudent = await query({
      query: "INSERT INTO student_tbl (first_name, middle_name, last_name) VALUES (?, ?, ?)",
      values: [firstName, middleName, lastName],
    })
    let student = []
    if (addStudent.insertId) {
      status = true
      message = "Added successfully."
    } else {
      status = false
      message = "error"
    }
    student = {
      tbl_id: addStudent.insertId,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
    }
    res.status(200).json({ response: { message: message, student: student, status: status } })
  }

  if (req.method === "PUT") {
    const { firstName, middleName, lastName, studentId } = req.body
    const updateStudent = await query({
      query: "UPDATE student_tbl SET first_name = ?, middle_name = ?, last_name = ? WHERE tbl_id = ? LIMIT 1",
      values: [firstName, middleName, lastName, studentId],
    })
    const result = updateStudent.affectedRows
    if (result) {
      status = true
      message = "Updated successfully."
    } else {
      status = false
      message = "error"
    }
    const product = {
      student_id: studentId,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
    }
    res.status(200).json({ response: { message: message, product: product, status: status } })
  }

  if (req.method === "DELETE") {
    const studentId = req.body.student_id
    const deleteStudent = await query({
      query: "DELETE FROM student_tbl WHERE tbl_id = ? LIMIT 1",
      values: [studentId],
    })
    const result = deleteStudent.affectedRows
    if (result) {
      status = true
      message = "Deleted successfully."
    } else {
      status = false
      message = "error"
    }
    res.status(200).json({ response: { message: message, student_id: studentId, status: status } })
  }
}
