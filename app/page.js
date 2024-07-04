import Image from "next/image";
import Header from "./_components/Header";
import Slider from "./_components/Slider";
import globalApi from "./_utils/globalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Banner from "./_components/Banner";
import Footer from "./_components/Footer";
import TopCategoryList from "./(routes)/products-category/_components/TopCategoryList";

export default async function Home() {
  try {
    const sliderList = await globalApi.getSlider();
    const categoryList = await globalApi.getCategoryList();
    const productList = await globalApi.getAllProducts();
    return (
      <>

        <Header />
        {/* Slider */}
        <Slider sliderList={sliderList} />
        {/* categoryList */}
        <CategoryList categoryList={categoryList} />
        {/* ProductList */}
        <ProductList productList={productList} />
        {/* banner */}
        <Banner />
        {/* footer */}
        <div className="w-full items-center justify-center px-16 py-10 pt-7">
          <Footer />
        </div>



      </>
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    // Handle the error, possibly rendering an error message or fallback UI
  }
}

// export default async function Home() {
//   const sliderList = await globalApi.getSlider();
//   const categoryList = await globalApi.getCategoryList();
//   const productList = await globalApi.getAllProducts();
//   return (
//     <>

//       <Header />
//       {/* Slider */}
//       <Slider sliderList={sliderList} />
//       {/* categoryList */}
//       <CategoryList categoryList={categoryList} />
//       {/* ProductList */}
//       <ProductList productList={productList} />
//       {/* banner */}
//       <Banner />
//       {/* footer */}
//       <div className="w-full items-center justify-center px-16 py-10 pt-7">
//         <Footer />
//       </div>

//     </>
//   );
// }
