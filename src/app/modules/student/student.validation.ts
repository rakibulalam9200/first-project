import { z } from 'zod'

const userValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
      },
      { message: 'First name should be capitalized' },
    ),
  middleName: z.string(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last name should contain only alphabetic characters',
  }),
})

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
})

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

const studentValidationSchema = z.object({
  id: z.string(),
  name: userValidationSchema.required(),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().nullable(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .nullable(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: z.string().nullable(),
  isActive: z.enum(['active', 'blocked']).default('active'),
})


export default studentValidationSchema;