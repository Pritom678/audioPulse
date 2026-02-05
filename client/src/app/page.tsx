import AudioExperience from "@/components/Home/AudioExperience";
import CallToAction from "@/components/Home/CallToAction";
import FeatureGrid from "@/components/Home/FeatureGrid";
import HeroSection from "@/components/Home/HeroSection";
import ProductHighlight from "@/components/Home/ProductHighlight";
import ProductRandom from "@/components/Product/ProductRandom";
import Container from "@/components/Shared/Container";

export default function Home() {
  return (
    <div className="bg-base-100">
      <Container>
        <HeroSection />
        <ProductRandom />
        <ProductHighlight />
        <FeatureGrid />
        <AudioExperience />
        <CallToAction />
      </Container>
    </div>
  );
}
