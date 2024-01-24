"use server";

import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../mongodb/db";
import User from "../mongodb/db/models/user.model";
import Event from "../mongodb/db/models/event.model";
import Category from "../mongodb/db/models/category.model";

const populateEventWithUserDataAndCategoryData = (query: any) => {
  query
    .populate({
      path: "organiser",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new Error("Organizer not found");
    }
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();
    const event = populateEventWithUserDataAndCategoryData(
      await Event.findById(eventId)
    );
    if (!event) throw new Error("Event not found");
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};
