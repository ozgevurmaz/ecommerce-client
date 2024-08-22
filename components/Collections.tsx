import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className=" my-12 flexCenter flex-col w-[80%] mx-auto">
      <h3 className="text-heading3-bold">Collections</h3>
      <p className="text-small-medium my-2 text-center  ">
        Upgrade your style with our curated sets. Choose confidence, embrace
        your unique look.
      </p>

      <div className="grid lg:grid-cols-2 w-full gap-3">
        {collections &&
          collections.slice(0, 4).map((collection: CollectionType) => (
            <Link
              key={collection._id}
              href={`/collections/${collection._id}`}
              className="flexAround rounded-lg shadow-lg transition-all duration-400 border bg-gray-200"
            >
              <div className="p-12 flex-1">
                <h4 className="text-heading4-bold">{collection.title}</h4>
                <p className="text-small-medium mt-2">
                  {collection.description}
                </p>
                <Button className="mt-2" variant={"secondary"}>
                  Explore Now
                </Button>
              </div>

              <div className="w-1/3 h-full relative ">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="lg:hover:scale-105 object-cover md:object-scale-down"
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Collections;
export const dynamic = "force-dynamic"; 