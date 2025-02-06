import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { CommonLayout } from "../layouts/CommonLayout";
import spinner from "../../../public/lotties/spinner.json";

export const LoadingSpinner = () => {
  return <Lottie animationData={spinner} loop={true} className="h-40" />;
};

export const LoadingScreen = () => {
  return (
    <CommonLayout>
      <LoadingSpinner />
    </CommonLayout>
  );
};
