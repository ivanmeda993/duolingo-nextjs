import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

interface IUserProgress {
  activeCourse: {
    imageSrc: string;
    title: string;
  };
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}
export const UserProgress = ({
  activeCourse,
  hasActiveSubscription,
  hearts,
  points,
}: IUserProgress) => {
  return (
    <div className="flex items-center gap-x-2 justify-between w-full">
      <Link href={`/courses`}>
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            alt="points image"
            className="mr-2"
            width={28}
            height={28}
          />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            height={22}
            width={22}
            alt="Hearts"
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};