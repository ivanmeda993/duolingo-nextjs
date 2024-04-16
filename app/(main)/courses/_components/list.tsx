"use client";

import { courses } from "@/db/schema";
import { Card } from "@/app/(main)/courses/_components/card";

interface IList {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId: number;
}
export const List = ({ courses, activeCourseId }: IList) => {
  const onClick = (id: number) => {};
  const pending = false;
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
