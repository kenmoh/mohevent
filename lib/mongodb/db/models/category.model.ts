import { model, models, Schema, Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
