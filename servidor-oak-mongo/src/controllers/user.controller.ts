import { Context, helpers, config, MongoClient, ObjectId } from "../../deps.ts";
import { User } from "../types/user.ts";

const {MONGO_URL,DATABASE_NAME} = config()
const client = new MongoClient()
try {
  await client.connect(MONGO_URL)
  console.log("conexion MONGO exitosa")
} catch (error) {
  console.log(error)
}

const db = client.database(DATABASE_NAME)
const userModel = db.collection<User>("users")


export const findUsers = async(ctx:Context)=>{
  try {
    const users = await userModel.find().toArray()
    ctx.response.status = 200
    ctx.response.body = {status:"success",data:users}
  } catch (error) {
    ctx.response.status = 401
    ctx.response.body = `Hubo un error ${error}`
  }
}

export const findUserById = async(ctx:Context)=>{
  try {
      const {id} = helpers.getQuery(ctx,{mergeParams:true}); //req.params.id;
      const user = await userModel.findOne({_id:new ObjectId(id)})
      ctx.response.status = 200;
      ctx.response.body = {status:"success", data:user};
  } catch (error) {
      ctx.response.status = 401;
      ctx.response.body = `Hubo un error ${error}`;
  }
};

export const createUser = async(ctx:Context)=>{
  try {
      const body = await ctx.request.body().value;
      const user = await userModel.insertOne(body)
      ctx.response.status = 200;
      ctx.response.body = {status:"success", data:user, message:"user created"}
  } catch (error) {
      ctx.response.status = 401;
      ctx.response.body = `Hubo un error ${error}`;
  }
};

export const updateUser = async(ctx:Context)=>{
  try {
      const {id} = helpers.getQuery(ctx,{mergeParams:true});
      const body = await ctx.request.body().value;
      await userModel.updateOne({_id: new ObjectId(id)}, {$set: body})
      ctx.response.status = 200;
      ctx.response.body = {status:"success", data:body, message:"user updated"}
  } catch (error) {
      ctx.response.status = 401;
      ctx.response.body = `Hubo un error ${error}`;
  }
};

export const deleteUser = async(ctx:Context)=>{
  try {
      const {id} = helpers.getQuery(ctx,{mergeParams:true});
      await userModel.deleteOne({_id: new ObjectId(id)})
      ctx.response.status = 200;
      ctx.response.body = {status:"success", message:"user deleted"}
  } catch (error) {
      ctx.response.status = 401;
      ctx.response.body = `Hubo un error ${error}`;
  }
};