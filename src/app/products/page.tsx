import Productcover from "@/features/products/Productcover";

type Props = {
  searchParams?: { cat?: string; page?: string };
};

const Page = ({ searchParams }: Props) => {
  return (
    <div>
      <Productcover searchParams={searchParams} />
    </div>
  );
};

export default Page;