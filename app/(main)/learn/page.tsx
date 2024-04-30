import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "@/app/(main)/learn/_components/header";
import { UserProgress } from "@/components/user-progress";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitData = getUnits();

  const [userProgress, units] = await Promise.all([userProgressData, unitData]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  console.log("units", units);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hasActiveSubscription={false}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            {JSON.stringify(unit)} test
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
