import Link from "next/link";
import { IEvent } from "@/lib/mongodb/db/models/event.model";
import { FiEdit } from "react-icons/fi";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import DeleteConfirmation from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[480px] flex-col overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: ` url(${event.imageUrl})` }}
        className="flex items-center justify-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {/* EVENT CREATOR */}
      {isEventCreator && !hidePrice && (
        <div className="absolute top-2 right-2 transition-all rounded-xl flex flex-col gap-6 bg-white p-3 shadow-sm">
          <Link href={`/events/${event._id}/update`}>
            <FiEdit className="h-4 w-4" />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <div className="flex min-h-[230px] flex-col p-5 gap:3 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="font-bold px-4 py-1 text-green-600 bg-green-100 rounded-full">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="font-semibold px-4 py-1 rounded-full text-gray-500 bg-gray-500/10">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="text-gray-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <Link href={`/events/${event._id}`}>
          <p className="line-clamp-2 text-xl md:text-2xl flex flex-1 text-black font-bold">
            {event.title}
          </p>
        </Link>
        <div className="flex justify-between w-full">
          <p className="=font-semibold text-xl text-gray-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-blue-500">Order Details</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
