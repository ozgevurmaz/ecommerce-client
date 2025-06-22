import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <section className="w-full bg-muted py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-heading2-bold text-foreground mb-4">
            Our Collections
          </h2>
          <p className="text-body-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upgrade your style with our curated sets. Choose confidence, embrace your unique look.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {collections &&
            collections.slice(0, 4).map((collection: CollectionType, index: number) => (
              <Link
                key={collection._id}
                href={`/collections/${collection._id}`}
                className="group block"
              >
                <div className={`relative overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-warm transition-all duration-500 hover:scale-[1.02] h-[280px] md:h-[320px] ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } flex`}>
                  
                  {/* Content Side */}
                  <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center relative z-10">
                    <div className="space-y-4">
                      {/* Collection Badge */}
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-small-bold rounded-full border border-primary/20">
                        Collection
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-heading4-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {collection.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-base-medium text-muted-foreground leading-relaxed line-clamp-3">
                        {collection.description}
                      </p>
                      
                      {/* CTA Button */}
                      <Button 
                        className="mt-4 bg-background hover:bg-primary hover:text-primary-foreground border-border hover:border-primary rounded-full px-6 py-2 text-small-bold transition-all duration-300 group-hover:scale-105 w-fit"
                      >
                        Explore Collection
                      </Button>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="w-2/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card/20 z-10" />
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 40vw, 20vw"
                    />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-primary/5 rounded-full -z-0" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-accent/30 rounded-full -z-0" />
                </div>
              </Link>
            ))}
        </div>

        {/* View All Collections CTA */}
        <div className="text-center mt-12">
          <Button 
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base-bold rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            <Link href="/collections">
              View All Collections
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Collections;
export const dynamic = "force-dynamic";