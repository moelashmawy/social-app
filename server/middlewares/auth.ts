import * as jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import User from "./../models/User";

// authenticate user
export const userAuth = async (req: any) => {
  const authHeader = (await req.get("token")) || (await req.get("cookie"));
  let token: string;

  if (authHeader) {
    token = authHeader.split("=")[1];
  }

  // check if the authentication exists
  if (!authHeader || authHeader === null || !token || token === null) {
    req.isAuth = false;
    req.user = null;
    throw new GraphQLError("Not authenticated, please login");
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // add user from token payload which contains the user id we attached to the token
    req.user = decoded;
  } catch (e) {
    throw new GraphQLError(e);
  }
};

// Admins auth
export const adminAuth = async (req: any) => {
  await userAuth(req);

  if (req.user.role !== "admin") {
    throw new GraphQLError("Not authenticated, Admins only");
  }
};
