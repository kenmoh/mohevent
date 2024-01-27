import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userEvents = await getEventsByUser({ userId, page: 1 });
  return (
    <>
      {/* USER TICKETS # */}
      <section className="bg-blue-50 bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="font-bold text-xl text-center sm:text-left">
            My Tickets
          </h3>
          <Button
            asChild
            size={"lg"}
            className="hidden sm:flex rounded-full bg-blue-500 text-white"
          >
            <Link href={"/#events"}>Explore More Events</Link>
          </Button>
        </div>
      </section>
      {/* <section className="wrapper my-8">
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - Plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          urlParamName="ordersPage"
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section> */}

      {/* USER ORGANIZED EVENTS */}
      <section className="bg-blue-50 bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="font-bold text-xl text-center sm:text-left">
            Events Organized
          </h3>
          <Button
            asChild
            size={"lg"}
            className="hidden sm:flex rounded-full  bg-blue-500 text-white"
          >
            <Link href={"/events/create"}>Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={userEvents?.data}
          emptyTitle="No event created yet"
          emptyStateSubtext="Create some now!"
          collectionType="Event_Organized"
          limit={6}
          urlParamName="eventsPage"
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;
