import Joi from 'joi'

// Custom transformation function to capitalize the first character of a string
// const capitalizeFirstLetter = (value:string, helpers) => {
//     const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
//     return capitalizedValue;
//   };

// Define Joi schema for the userNameSchema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .trim()
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
    .message(
      '{#label} must start with an uppercase letter and contain only letters',
    ),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .trim()
    .alphanum()
    .message('{#label} must contain only letters'),
})

// Define Joi ValidationSchema for the guardianValidationSchema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
})

// Define Joi ValidationSchema for the localGuardianValidationSchema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
})

// Define Joi ValidationSchema for the studentValidationSchema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
})

export default studentValidationSchema;