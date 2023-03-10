import { Fragment } from "react";
import { Footer, MetaData, Navbar } from "../components";

const Privacy = () => {
  return (
    <Fragment>
      <MetaData
        title="RedflagAI Privacy Policy"
        description="Don't risk legal trouble. RedFlag AI's advanced machine learning algorithms help identify problematic areas in your terms of use. Protect your business and stay compliant with RedFlag AI."
      />
       <Navbar />
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 py-16 text-center">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-500">Last updated: 8 March -2023</p>
          <div className="mt-6 prose prose-lg text-gray-500">
            <h2 className="text-xl text-gray-800 my-2">
              Information We Collect
            </h2>
            <p>
              We collect personal information that you provide to us, such as
              your name, email address, and payment information. We also collect
              information about how you use our product, such as the pages you
              visit and the actions you take.
            </p>
            <h2 className="text-xl text-gray-800 my-2">
              How We Use Your Information
            </h2>
            <p>
              We use your personal information to provide and improve our
              product. We may also use your information to communicate with you,
              send you marketing materials, and respond to your inquiries.
            </p>
            <h2 className="text-xl text-gray-800 my-2">
              How We Protect Your Information
            </h2>
            <p>
              We implement a variety of security measures to protect your
              personal information from unauthorized access, use, or disclosure.
              However, no data transmission over the Internet or storage of data
              can be guaranteed to be 100% secure. Therefore, while we strive to
              use commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
            <h2 className="text-xl text-gray-800 my-2">
              Sharing Your Information
            </h2>
            <p>
              We do not sell or rent your personal information to third parties.
              However, we may share your information with our service providers
              and business partners who assist us in providing our product.
            </p>
            <h2 className="text-xl text-gray-800 my-2">Your Rights</h2>
            <p>
              You have the right to access, update, and delete your personal
              information. You can do so by contacting us at
              vipanshthakur@gmail.com.
            </p>
            <h2 className="text-xl text-gray-800 my-2">
              Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to modify this privacy policy at any time. If
              we make material changes to this policy, we will notify you by
              email or by posting a notice on our website.
            </p>
            <h2 className="text-xl text-gray-800 my-2">Contact Us</h2>
            <p>
              If you have any questions or concerns about this privacy policy,
              please contact us at vipanshthakur@gmail.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Privacy;
