"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValue } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import FileUploader from "./FileUploader";
import { Checkbox } from "@/components/ui/checkbox";

type EventProp = {
  userId: string;
  type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventProp) => {
  const [startDate, setStartDate] = useState(new Date());
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = eventDefaultValue;
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-5 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Event Description"
                    {...field}
                    className="textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    setFiles={setFiles}
                    imageUrl={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center bg-gray-50 w-full h-[54px] overflow-hidden rounded-full px-4 py-2">
                    <CiLocationOn />
                    <Input
                      placeholder="Event Location or Online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex  gap-3 items-center bg-gray-50 w-full h-[54px] overflow-hidden rounded-full px-4 py-2">
                    <CiCalendarDate />
                    <p className="text-gray-500">Start Date: </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time: "
                      dateFormat="MM-dd-yyyy hh:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex  gap-3 items-center bg-gray-50 w-full h-[54px] overflow-hidden rounded-full px-4 py-2">
                    <CiCalendarDate />
                    <p className="text-gray-500">End Date: </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time: "
                      dateFormat="MM-dd-yyyy hh:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center bg-gray-50 w-full h-[54px] overflow-hidden rounded-full px-4  py-2">
                    <FiDollarSign />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="input-field"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex  items-center bg-gray-50 w-full h-[54px] overflow-hidden rounded-full px-4 py-2">
                              <label
                                htmlFor="isFree"
                                className="leading-none text-gray-500 peer-disabled:cursor-not-allowed pr-3 whitespace-nowrap peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox id="isFree" className="mr-2 h-5 w-5" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="bg-blue-800" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
