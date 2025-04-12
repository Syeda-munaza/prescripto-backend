
// Utility function for field validation
export const validateField = (field, value, validationSchema) => {
  const rule = validationSchema[field];
  if (!rule) return null;

  // Check for required fields
  if (rule.required && (!value || value.trim() === "")) {
    return rule.message;
  }

  // Check for minimum length
  if (rule.minLength && value.length < rule.minLength) {
    return `${field} must be at least ${rule.minLength} characters long`;
  }

  // Check for email pattern
  if (rule.type === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return rule.message;
    }
  }

  // Check for number type
  if (rule.type === "number" && isNaN(value)) {
    return rule.message;
  }

  // Check for specific pattern
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.message;
  }

  return null; // No errors
};

// Validator middleware function
export const validator =
  (validationSchemas, property = "body", place = "body") =>
  (req, res, next) => {
    const errors = [];
    const body = req[place];
    if (!body || typeof body !== "object") {
      return res
        .status(400)
        .json({ message: "Invalid request payload", success: false });
    }

    // Loop through the validation schemas
    validationSchemas.forEach((validationSchema) => {
      Object.keys(validationSchema).forEach((field) => {
        const error = validateField(field, body[field], validationSchema);
        if (error) {
          errors.push({ field, message: error });
        }
      });
    });

    if (errors.length === 0) {
      next(); // No validation errors, proceed to next middleware
    } else {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        errors,
      });
    }
  };
