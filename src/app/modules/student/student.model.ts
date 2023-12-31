import { Schema, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  // studentMethods,
} from './student.interface'
import config from '../../config'

// sub schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, "First Name cann't be more than 20 characters"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not Valid',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact no. is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact no. is required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact no is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian address is required'],
  },
})

// create schema
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, "Password cann't be 20"],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        "{VALUE} is not valid. The gender field can only be one of the following: 'male','female', or 'other'.",
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
  },
  contactNo: { type: String, required: [true, 'Contact no is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact no is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+ ', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+ ', 'O-'],
      message: '{VALUE} is not valid.',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address  is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Parmanent Address  is required'],
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
})

// pre save middleware/hook : will work on create/save method
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data')
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this // current document which is processing
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// post save middleware/hook
studentSchema.post('save', function () {
  console.log(this, 'post hook : we saved our data')
})

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// Creating a custome instance method
// studentSchema.methods.isUserExists= async function(id:string){
//   const existingUser = await Student.findOne({id})
//   return existingUser
// }

// create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
