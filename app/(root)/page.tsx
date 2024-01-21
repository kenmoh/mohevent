import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-gray-50 bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-bold md:text-6xl text-4xl">
              Host, Connect, Celebrate: Your Events, Our Platform
            </h1>
            <p className="text-gray-800">
              Book and learn helpful tips from over 2000 mentors in world-class
              companies with our global community.
            </p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-fit bg-blue-800 rounded-full hover:bg-blue-700"
            >
              <Link href="/events">Explore Events</Link>
            </Button>
          </div>
          <Image
            src={"/event.jpg"}
            alt="event"
            height={1000}
            width={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 gap-8 flex flex-col md:gap-12"
      >
        <h2 className="font-bold text-3xl">
          Trusted by <br /> Thousands of Events.
        </h2>
        <div className="w-full flex flex-col gap-5 md:flex-row">
          Search category
        </div>
      </section>
    </>
  );
}
