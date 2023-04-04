import { Router } from "../../deps.ts";
import { createUser, findUsers, findUserById, updateUser, deleteUser } from "../controllers/user.controller.ts";

export const userRouter = new Router()
.get("/users",findUsers)
.get("/users/:id",findUserById)
.post("/users",createUser)
.put("/users/:id",updateUser)
.delete("/users/:id",deleteUser)