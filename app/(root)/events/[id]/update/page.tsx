import { auth } from "@clerk/nextjs";
import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);
  return (
    <>
      <section className="bg-cover bg-primary bg-center py-5 md:py-10">
        <h3 className="wrapper font-bold text-xl text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          userId={userId}
          type="Update"
          event={event}
          eventId={event._id}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
