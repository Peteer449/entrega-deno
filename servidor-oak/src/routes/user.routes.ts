import { Router } from "../../deps.ts";
import { createUser, findUsers, findUserById } from "../controllers/user.controller.ts";

export const userRouter = new Router()
.get("/users",findUsers)
.get("/users/:id",findUserById)
.post("/users",createUser)