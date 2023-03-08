import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { Footer, MetaData } from "../components";

type Props = {};

const Terms = (props: Props) => {
  return (
    <Fragment>
      <MetaData
        title="RedFlag AI Pricing "
        description="RedFlag AI's advanced algorithms can help identify areas in your pricing strategy that could be optimized. Don't leave money on the table. Try RedFlag AI today and maximize your profits"
      />
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 py-16 text-center">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-500">Last updated: 8 March -2023</p>

          <h1 className="text-3xl font-bold mb-4">TERMS OF USE</h1>
          <p className="mb-4">
            Welcome to RedFlag AI. By using our service, you agree to these
            terms. Please read them carefully.
          </p>
          <h2 className="text-xl font-bold mb-2">Use of Service</h2>
          <p className="mb-4">
            RedFlag AI provides a SaaS service that helps identify potential red
            flags in terms and conditions. You may use the service only for
            lawful purposes and in accordance with these terms.
          </p>
          <h2 className="text-xl font-bold mb-2">No Legal Advice</h2>
          <p className="mb-4">
            RedFlag AI is not a law firm and does not provide legal advice. The
            service is for informational purposes only and does not constitute
            legal advice. Use of the service does not create an attorney-client
            relationship.
          </p>
          <h2 className="text-xl font-bold mb-2">Accuracy of Information</h2>
          <p className="mb-4">
            We strive to provide accurate and up-to-date information, but we do
            not guarantee the accuracy or completeness of the information
            provided. You are responsible for verifying the accuracy of any
            information you rely on.
          </p>
          <h2 className="text-xl font-bold mb-2">Intellectual Property</h2>
          <p className="mb-4">
            All content and materials on RedFlag AI, including but not limited
            to text, graphics, logos, images, and software, are the property of
            RedFlag AI or its licensors and are protected by intellectual
            property laws.
          </p>
          <h2 className="text-xl font-bold mb-2">Refund Policy</h2>
          <p className="mb-4">
            If you are not satisfied with our service, you may request a refund
            within 30 days of your purchase. To request a refund, please contact
            us at <a href="mailto:contact@email">contact email</a>. We reserve
            the right to refuse a refund if we believe the request is fraudulent
            or abusive.
          </p>
          <h2 className="text-xl font-bold mb-2">Disclaimer of Warranties</h2>
          <p className="mb-4">
            RedFlag AI is provided "as is" without warranties of any kind,
            whether express or implied. We do not guarantee that the service
            will be uninterrupted or error-free, nor do we make any warranties
            regarding the results that may be obtained from the use of the
            service.
          </p>
          <h2 className="text-xl font-bold mb-2">Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, RedFlag AI and its
            affiliates, officers, directors, employees, and agents will not be
            liable for any direct, indirect, incidental, special, or
            consequential damages arising out of or in connection with the use
            of the service.
          </p>
          <h2 className="text-xl font-bold mb-2">Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. By
            continuing to use the service after any changes, you agree to be
            bound by the modified terms.
          </p>
          <h2 className="text-xl font-bold mb-2">Governing Law</h2>
          <p className="mb-4">
            These terms will be governed by and construed in accordance with the
            laws of India, without giving effect to any principles
            of conflicts of law.
          </p>

          <h1 className="text-3xl font-bold mb-4">REFUND POLICY</h1>
          <p className="mb-2">
            If you are not satisfied with our service, you may request a refund
            within 30 days of your purchase. To request a refund, please contact
            us at{" "}
            <Link href="mailto:contact@email">vipanshthakur@gmail.com</Link>. We
            reserve the right to refuse a refund if we believe the request is
            fraudulent or abusive.
          </p>
          <p className="mb-2">
            We are not responsible for any errors or inaccuracies in the
            information provided by the service. You are responsible for
            verifying the accuracy of any information you rely on.
          </p>
          <p>
            Please note that our refund policy only applies to purchases made
            directly from RedFlag AI. If you purchased our service through a
            third-party, you will need to contact that third-party for refund
            information.
          </p>

          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default Terms;
