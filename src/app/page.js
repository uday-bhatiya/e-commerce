import Hero from "@/components/pages/Hero";
import ProductList from "@/components/pages/ProductList";

export default function Home() {
  return (
    <div>
      <Hero />

      <div className='p-10 md:px-36 lg:px-48'>
        <ProductList />
      </div>
    </div>
  );
}
