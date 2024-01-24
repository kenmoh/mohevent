import { getEventById } from "@/lib/actions/event.actions";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);
  console.log(event);
  return (
    <section className="flex just-center bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageUrl}
          alt="hero image"
          height={1000}
          width={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold">{event.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="font-bold rounded-full bg-green-500/10 px-5 py-2 bg-green-700">
                  {event.isFree ? "FREE" : `$${event.price}`}
                </p>
                <p className="font-semibold rounded-full px-4 py-2.5 bg-gray-500/10 text-gray-500">
                  {event.category.name}
                </p>
              </div>
              <div className="mt-2 ml-2 sm:mt-0">
                by{" "}
                <span className="text-blue-500">
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </div>
            </div>
            {/* CHECKOUT BTN */}
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <CiCalendarDate className="h-16 w-16" />
                <div className="flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CiLocationOn className="h-3 w-3" />
                <p>{event.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-gray-600">What You'l Learn</p>
              <p>{event.description}</p>
              <p className="trucated text-blue-500 underline">{event.url}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
