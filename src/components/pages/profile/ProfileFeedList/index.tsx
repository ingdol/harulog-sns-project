import { IFeed } from "@/services/feed";
import { getImageUrl } from "@/utils/supabase/storage";
import Image from "next/image";
import Link from "next/link";

export default function ProfileFeed({ feeds }: { feeds: IFeed[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4 border-t border-gray-200 pt-10 mt-10">
      {feeds?.map((feed: IFeed) => (
        <Link
          key={feed.id}
          href={`/feed/${feed.id}`}
          className="w-full bg-gray-200 aspect-square relative"
        >
          <Image
            src={getImageUrl(feed.feed_image)}
            alt="Feed image"
            priority
            fill
            className="object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
