import { Document, Schema, model, models } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  event: { _id: string; name: string };
  buyer: { _id: string; firstName: string; lastName: string };
}

export type IOrderItem = {
  _id: string;
  createdAt: Date;
  stripeId: string;
  eventId: string;
  eventTitle: string;
  totalAmount: string;
};

const OrderSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  stripeId: { type: String, required: true, unique: true },
  totalAmount: { type: String },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
