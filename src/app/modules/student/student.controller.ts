import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // data validation using Joi
    const { error, value } = studentValidationSchema.validate(studentData)
    // will call service func to send to this data

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: error.details,
      })
    }

    const result = await StudentServices.createStudentIntoDB(value)

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingletudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
