import { Mail } from "lucide-react";
import BreadCrumb from "../components/BreadCrumb";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/",
  },
];

const SupportPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full p-8 pt-6 bg-[#EFF6FF]">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName="Support"
      />

      <div className="flex flex-col gap-4 p-8 h-full">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-black">Reach out to us</h1>

        <div className="flex flex-col justify-center items-center gap-4 p-16 h-full w-[55%] bg-white rounded-lg">
          {/* description */}
          <p className="text-base text-[#142349] mb-4 w-4/5 text-center">
            If you're experiencing any issues, have found a bug, or simply have
            some suggestions or feedback you'd like to share, we're all ears!
            Your input is invaluable to us and helps make our platform better
            for everyone.
          </p>

          <div className="flex flex-col justify-center gap-4 w-4/5">
            <div className="flex flex-row gap-4 items-center">
              <Mail className="w-6 h-6 text-[#2059EE]" />
              <p className="text-base text-black">
                For <strong>technical support</strong>, you can reach out to us
                at{" "}
                <strong className="underline text-[#2059EE]">
                  contact@sakshm.com
                </strong>
              </p>
            </div>

            <div className="flex flex-row gap-4 items-center">
              <Mail className="w-6 h-6 text-[#2059EE]" />
              <p className="text-base text-black">
                For any <strong>course-related queries</strong>, please contact{" "}
                <strong className="underline text-[#2059EE]">
                  support@orbitskilling.com
                </strong>{" "}
                or <strong className="text-[#2059EE]">+9173049 34568</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
