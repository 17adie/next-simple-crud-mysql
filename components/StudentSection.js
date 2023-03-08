import React, { useState, useEffect } from "react"
import toast from "react-hot-toast"

function StudentSection() {
  // state
  const [students, setStudents] = useState([])
  const [toUpdate, setToUpdate] = useState(false)
  const [studentInfo, setStudentInfo] = useState([])

  // daya para sa edit
  // scenario: click edit btn, then erase the values in input, kapag ni click mo ult yung edit makukuha mo padin yung value
  // para kada bago ng state nag ra rrun yung useEffect, para dn pag same ung rows na inedit makukuha padin yung value
  const [hold, setHold] = useState(false)

  const [fullName, setFullName] = useState([])

  // functions

  // api call
  async function getStudentData() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/students`, postData)
    const response = await res.json()
    setStudents(response.students)
    // console.log(response)
  }

  async function deleteStudent(id) {
    if (!id) return
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: id,
      }),
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/students`, postData)
    const response = await res.json()
    console.log(response.response)
    if (response.response.status) {
      getStudentData()
      clearInputs()
      setToUpdate(false)
      toast.success(response.response.message)
    } else {
      clearInputs()
      setToUpdate(false)
      toast.error(response.response.message)
    }
  }

  async function addNewStudent() {
    let { firstName, lastName } = fullName

    if (firstName.trim().length == 0 || lastName.trim().length == 0) {
      toast.error("Please fill all required fields.")
      return
    }

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullName),
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/students`, postData)
    const response = await res.json()
    console.log(response)

    if (response.response.status) {
      getStudentData()
      clearInputs()
      toast.success(response.response.message)
    } else {
      toast.error(response.response.message)
    }
  }

  async function updateProduct() {
    let { firstName, lastName } = fullName

    if (firstName.trim().length == 0 || lastName.trim().length == 0) {
      toast.error("Please fill all required fields.")
      return
    }

    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullName),
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/students`, postData)
    const response = await res.json()
    console.log(response)
    if (response.response.status) {
      getStudentData()
      clearInputs()
      setToUpdate(false)
      toast.success(response.response.message)
    } else {
      toast.error(response.response.message)
    }
  }

  // normal functions
  function editStudent(v) {
    console.log(v)
    setToUpdate(true)
    setStudentInfo(v)
    setHold((prevState) => !prevState)
  }

  function clearInputs() {
    setFullName({
      studentId: "",
      firstName: "",
      middleName: "",
      lastName: "",
    })
  }

  function cancelBtn() {
    // reset state
    setToUpdate(false)
    clearInputs()
  }

  function updateBtn() {
    console.log("hold: ", hold)
    console.log("fullName: ", fullName)
    updateProduct()
  }

  // multiple input values
  function handleChange(event) {
    const { name, value } = event.target
    setFullName((prevName) => ({
      ...prevName,
      [name]: value,
    }))
  }

  // useEffects
  useEffect(() => {
    getStudentData()
  }, [])

  // every id changes(edit btn) this effect runs
  useEffect(() => {
    setFullName({
      studentId: studentInfo.tbl_id || "",
      firstName: studentInfo.first_name || "",
      middleName: studentInfo.middle_name || "",
      lastName: studentInfo.last_name || "",
    })
  }, [hold])

  return (
    <>
      <div className="w-full bg-white rounded-md">
        <div className="flex flex-wrap p-5">
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name <small className="text-red-400">required</small>
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
              id="grid-first-name"
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              value={fullName.firstName || ""}
              // onChange={(e) => setFirstName(e.target.value)} // for single useState
            />
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-middle-name"
            >
              Middle Name
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
              id="grid-middle-name"
              type="text"
              placeholder="Middle Name"
              name="middleName"
              onChange={handleChange}
              value={fullName.middleName || ""}
              // onChange={(e) => setMiddleName(e.target.value)} // for single useState
            />
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name <small className="text-red-400">required</small>
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={fullName.lastName || ""}
              // onChange={(e) => setLastName(e.target.value)} // for single useState
            />
          </div>
          {!toUpdate ? (
            <div className="w-full md:w-1/4 px-3 self-center pt-8">
              <button
                onClick={addNewStudent}
                className="bg-white hover:bg-gray-100 text-gray-800  py-1 px-4 border border-gray-400 rounded shadow"
              >
                Add
              </button>
            </div>
          ) : (
            <div className="w-full md:w-1/4 px-3 self-center pt-8 flex gap-4">
              <button
                onClick={updateBtn}
                className="bg-white hover:bg-gray-100 text-gray-800  py-1 px-4 border border-gray-400 rounded shadow"
              >
                Update
              </button>
              <button
                onClick={cancelBtn}
                className="bg-red-500 hover:bg-red-400 text-white  py-1 px-4 border border-gray-400 rounded shadow"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto pt-5">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Middle Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((v, i) => {
                  return (
                    <tr key={v.tbl_id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{v.tbl_id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{v.first_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{v.middle_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{v.last_name}</td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() => editStudent(v)}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteStudent(v.tbl_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentSection
