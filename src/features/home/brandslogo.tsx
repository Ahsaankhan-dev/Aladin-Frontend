'use client'

import Image from "next/image";
import Link from "next/link";

type Brand = {
  name: string;
  href: string;
  img: string;
};

interface Props {
  brands: Brand[];
}

const BrandSlider: React.FC<Props> = ({ brands }) => {
  return (
    <div className="slider">
      <div className="slide-track">
        {[...brands, ...brands,...brands].map((b, i) => (
          <Link key={i} href={b.href} prefetch={false}>
            <Image
              src={b.img}
              alt={b.name}
              width={60}
              height={60}
              className="object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandSlider;