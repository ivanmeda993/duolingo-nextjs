import { cache } from "react";
import { db } from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses, units, userProgress } from "@/db/schema";

export const getUserProgress = cache(async () => {
  const { userId } = auth();
  if (!userId) return null;

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });
  return data;
});

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  console.log("userProgress", userProgress);
  if (!userProgress?.activeCourseId) {
    console.log("no active course");
    return [];
  }

  const unitsData = await db.query.units.findMany({
    where: eq(units.id, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: true,
            },
          },
        },
      },
    },
  });

  console.log("unitsData", unitsData);

  const normalizedUnits = unitsData.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });
      return { ...lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedUnits;
});

export const getCourses = cache(async () => await db.query.courses.findMany());

export const getCourseById = cache(async (id: number) => {
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, id),
  });
  return course;
});
