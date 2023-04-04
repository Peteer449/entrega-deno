import { Application, config } from "../deps.ts";
import { userRouter } from "./routes/user.routes.ts";

const {PORT} = config()
const port = parseInt(PORT)

const app = new Application()

app.use(userRouter.routes())

app.listen({port})
console.log(`Server listening on port ${port}`)