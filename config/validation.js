// doctorValidationRules.js
export const doctorValidationFields = {
  name: {
    required: true,
    minLength: 1,
    message: "Name is required",
  },
  email: {
    required: true,
    type: "email",
    message: "Valid email is required",
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    message:
      "Password must be at least 8 characters long and contain lowercase, uppercase, number, and special character",
  },
  speciality: {
    required: true,
    minLength: 1,
    message: "Speciality is required",
  },
  degree: {
    required: true,
    minLength: 1,
    message: "Degree is required",
  },
  experience: {
    required: true,
    minLength: 1,
    message: "Experience is required",
  },
  about: {
    required: true,
    minLength: 1,
    message: "About section is required",
  },
  available: {
    required: true,
    type: "boolean",
    message: "Available status is required",
  },
  fee: {
    required: true,
    type: "number",
    message: "Fee must be a numeric value",
  },
  address: {
    required: true,
    minLength: 1,
    message: "Address is required",
  },
  slots_booked: {
    type: Object,
    default: {},
    validate: {
      validator: function (value) {
        // Validate that the value is an object and not empty
        if (typeof value !== "object" || Object.keys(value).length === 0) {
          return false;
        }

        // Optional: Check if the slots for each date are arrays and have values
        for (let date in value) {
          if (!Array.isArray(value[date]) || value[date].length === 0) {
            return false;
          }
        }

        return true; // If the object has valid slots data
      },
      message: "Slots must be a non-empty object with valid date-slot pairs.",
    },
  },
};

export const loginAdminValidation = {
  email: {
    required: true,
    type: "email",
    message: "Email address is required",
  },
  password: {
    required: true,
    message: "Password is required",
  },
};