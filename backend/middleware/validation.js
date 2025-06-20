const { body, param, query, validationResult } = require("express-validator");

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorDetails = {};
    errors.array().forEach((error) => {
      errorDetails[error.path] = error.msg;
    });

    return res.status(422).json({
      success: false,
      error: "Validation Error",
      details: errorDetails,
    });
  }

  next();
};

// User validation rules
const validateUserRegistration = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(
      "Username can only contain letters, numbers, dots, underscores, and hyphens"
    ),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  body("first_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name is required and must be less than 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "First name can only contain letters, spaces, apostrophes, and hyphens"
    ),

  body("last_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name is required and must be less than 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Last name can only contain letters, spaces, apostrophes, and hyphens"
    ),

  body("role")
    .optional()
    .isIn(["admin", "hr", "manager", "employee"])
    .withMessage("Role must be one of: admin, hr, manager, employee"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be one of: male, female, other"),

  body("department_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Department ID must be a positive integer"),

  body("employment_type")
    .optional()
    .isIn(["full-time", "part-time", "contract", "intern"])
    .withMessage(
      "Employment type must be one of: full-time, part-time, contract, intern"
    ),

  body("salary")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Salary must be a positive number"),

  body("phone")
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage("Please provide a valid phone number"),

  handleValidationErrors,
];

const validateUserLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username or email is required")
    .custom((value) => {
      // Accept either a valid email or a valid username
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9._-]{3,50}$/;
      if (!emailRegex.test(value) && !usernameRegex.test(value)) {
        throw new Error(
          "Must be a valid email or username (3-50 chars, letters, numbers, dots, underscores, hyphens)"
        );
      }
      return true;
    }),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

const validateUserUpdate = [
  body("first_name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name must be between 1 and 50 characters"),

  body("last_name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be between 1 and 50 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("phone")
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage("Please provide a valid phone number"),

  handleValidationErrors,
];

// Department validation rules
const validateDepartment = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be between 2 and 100 characters")
    .notEmpty()
    .withMessage("Department name is required"),

  body("code")
    .trim()
    .isLength({ min: 2, max: 10 })
    .withMessage("Department code must be between 2 and 10 characters")
    .isUppercase()
    .withMessage("Department code must be uppercase")
    .notEmpty()
    .withMessage("Department code is required"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be less than 500 characters"),

  body("manager_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Manager ID must be a positive integer"),

  body("budget")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Budget must be a positive number"),

  handleValidationErrors,
];

// Leave validation rules
const validateLeaveRequest = [
  body("leave_type")
    .isIn(["annual", "sick", "maternity", "paternity", "emergency", "unpaid"])
    .withMessage(
      "Leave type must be one of: annual, sick, maternity, paternity, emergency, unpaid"
    )
    .notEmpty()
    .withMessage("Leave type is required"),

  body("start_date")
    .isDate()
    .withMessage("Start date must be a valid date")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Start date must be in the future");
      }
      return true;
    })
    .notEmpty()
    .withMessage("Start date is required"),

  body("end_date")
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_date)) {
        throw new Error("End date must be after start date");
      }
      return true;
    })
    .notEmpty()
    .withMessage("End date is required"),

  body("reason")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Reason must be between 10 and 500 characters")
    .notEmpty()
    .withMessage("Reason is required"),

  handleValidationErrors,
];

const validateLeaveStatus = [
  body("status")
    .isIn(["approved", "rejected"])
    .withMessage("Status must be either approved or rejected")
    .notEmpty()
    .withMessage("Status is required"),

  body("comments")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Comments must be less than 500 characters"),

  handleValidationErrors,
];

// Transfer validation rules
const validateTransferRequest = [
  body("to_department_id")
    .isInt({ min: 1 })
    .withMessage("Destination department ID must be a positive integer")
    .notEmpty()
    .withMessage("Destination department ID is required"),

  body("reason")
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Reason must be between 20 and 500 characters")
    .notEmpty()
    .withMessage("Reason is required"),

  handleValidationErrors,
];

const validateTransferStatus = [
  body("status")
    .isIn(["approved", "rejected"])
    .withMessage("Status must be either approved or rejected")
    .notEmpty()
    .withMessage("Status is required"),

  body("transfer_date")
    .optional()
    .isDate()
    .withMessage("Transfer date must be a valid date")
    .custom((value) => {
      if (value && new Date(value) <= new Date()) {
        throw new Error("Transfer date must be in the future");
      }
      return true;
    }),

  body("comments")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Comments must be less than 500 characters"),

  body("salary_change")
    .optional()
    .isFloat()
    .withMessage("Salary change must be a number"),

  body("new_position")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("New position must be less than 100 characters"),

  handleValidationErrors,
];

// Parameter validation
const validateId = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),

  handleValidationErrors,
];

const validateUserId = [
  param("user_id")
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),

  handleValidationErrors,
];

const validateDepartmentId = [
  param("department_id")
    .isInt({ min: 1 })
    .withMessage("Department ID must be a positive integer"),

  handleValidationErrors,
];

// Query validation
const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateDepartment,
  validateLeaveRequest,
  validateLeaveStatus,
  validateTransferRequest,
  validateTransferStatus,
  validateId,
  validateUserId,
  validateDepartmentId,
  validatePagination,
};
