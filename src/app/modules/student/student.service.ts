import { Student } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (studentData: Student) => {
  // const result = await StudentModel.create(student)// build in static method

  // Create student data using mongoose build in instance method 
  // by creating object can save method
  const student = new StudentModel(studentData)
  const result = student.save()
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingletudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingletudentFromDB,
}
