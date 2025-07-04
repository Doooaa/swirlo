import HomeHero from "../../components/HomeHero/HomeHero";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductDetails from "../ProductDetails/ProductDetails";
import HomeSecOne from "../../components/HomeSecOne/HomeSecOne";
import { Link } from "react-router";
import HomeSecTwo from "../../components/HomeSecTwo/HomeSecTwo";

export default function Home() {
  return (
    <>
      <HomeHero></HomeHero>
      <CategoryCard></CategoryCard>
      <HomeSecOne></HomeSecOne>
      <HomeSecTwo></HomeSecTwo>
    </>
  );
}
