import * as Yup from "yup";
import User from "../../models/User";
import * as bcrypt from "bcrypt";

// validate user inputs using Yup
export const signupvalidatation = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .min(2, "Must be more than one character")
    .required("Username is required")
    .test("uniqueUsername", "This username already exists", async userName => {
      const user = await User.findOne({ userName: userName });
      return !user;
    }),
  email: Yup.string()
    .email("Please enter a vaild email")
    .required("email is required")
    .test("uniqueEmail", "This email already exists", async email => {
      const user = await User.findOne({ email: email });
      return !user;
    }),
  password: Yup.string()
    .trim()
    .required("password is required")
    .min(6, "Password is too short")
    .matches(
      /[a-zA-Z0-9@!#%]/,
      "Password can only contain Latin letters, numbers and/or [@, !, #, %]."
    ),
  verifyPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(8, "Must be more than 8 characters")
    .required("This field is required"),
  firstName: Yup.string()
    .min(2, "Must be more than one character")
    .required("first Name is required"),
  lastName: Yup.string()
    .min(2, "Must be more than one character")
    .required("lastName is required")
});

// validate user inputs using Yup
export const loginValidatation = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .min(2, "Must be more than one character")
    .required("Username is required")
    .test("checkUsername", "Invalid username", async userName => {
      const user = await User.findOne({ userName: userName });
      return !!user;
    }),
  password: Yup.string()
    .trim()
    .required("password is required")
    .min(6, "Password is too short")
    .when("userName", (userName: string, schema: any) =>
      schema.test({
        test: async (password: string) => {
          const user = await User.findOne({ userName: userName });
          const valid = await bcrypt.compare(password, user!.password);
          return valid;
        },
        message: "Invalid password"
      })
    )
});
