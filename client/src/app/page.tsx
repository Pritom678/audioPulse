import AudioExperience from "@/components/Home/AudioExperience";
import CallToAction from "@/components/Home/CallToAction";
import FeatureGrid from "@/components/Home/FeatureGrid";
import HeroSection from "@/components/Home/HeroSection";
import ProductHighlight from "@/components/Home/ProductHighlight";

export default function Home() {
  return (
    <div className="bg-base-100">
      <HeroSection />
      <ProductHighlight />
      <FeatureGrid />
      <AudioExperience />
      <CallToAction />
    </div>
  );
}
