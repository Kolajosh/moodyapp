import Carousel from "@components/Carousel";
import Navbar from "@components/Navbar";

const Home = () => {
  return (
    <>
      <div className="font-poppins">
        <Navbar />
      </div>
      <section className="w-full flex-center mt-20 flex-col">
        <h1 className="text-center text-4xl font-bold">
          Document your mood whenever
        </h1>
        <div className="w-full overflow-hidden">
          <Carousel />
        </div>
      </section>
    </>
  );
};

export default Home;
