import { Model, Schema, model } from "mongoose";

type TUser = {
    username: string;
    password: string;
};

type UserModel = Model<TUser, Record<string, unknown>>;

const userSchema = new Schema<TUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export { userSchema, UserModel };


export const User = model<TUser, UserModel>("User", userSchema);