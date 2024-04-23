"use client";

import { courses, userProgress } from "@/db/schema";
import { Card } from "@/app/(main)/courses/_components/card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

interface IList {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}
export const List = ({ courses, activeCourseId }: IList) => {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (activeCourseId === id) router.push("/learn");

    startTransition(() => {
      upsertUserProgress(id).catch((error) =>
        toast.error("Something went wrong"),
      );
    });
  };
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
