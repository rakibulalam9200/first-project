import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  if(await Student.isUserExists(studentData.id)){
    throw new Error("User already exists!")
   }
   const result = await Student.create(studentData)// build in static method
   
  // Create student data using mongoose build in instance method
  // by creating object can save method
  // const student = new Student(studentData)
  // if(await student.isUserExists(studentData.id)){
  //   throw new Error("User already exists!")
  // }
  // const result = student.save()
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingletudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingletudentFromDB,
}
