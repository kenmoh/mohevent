"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../mongodb/db";
import User from "../mongodb/db/models/user.model";
import Event from "../mongodb/db/models/event.model";
import Order from "../mongodb/db/models/order.model";
import { revalidatePath } from "next/cache";

// CREATE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

// UPDATE USER
export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("User update failed!");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

// DELETE USER
export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();
    // find user to delete
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error("User delete failed!");

    //   remove relationship
    await Promise.all([
      // update the 'event' collection to remove refrences to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
      // Update the 'orders' collection to remove refrences to the use
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);
    //   delete the user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
};
