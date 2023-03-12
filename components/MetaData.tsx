import Head from "next/head";
import fire from "public/fire.png";
import redflagai from "public/redflagai.png";

type Props = {
  title?: string;
  description?: string;
};

const MetaData: React.FC<Props> = ({
  title = "RedFlag AI Terms and Conditions Review | RedflagAI",
  description = "Looking for a powerful tool to help identify potential issues in your terms and conditions? Look no further than RedFlag AI. Our advanced machine learning algorithms highlight problematic areas, allowing you to make informed decisions and minimize risk. Protect your business with RedFlag AI today.",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={fire.src} />
     
      <meta
        name="keywords"
        content="RedFlag AI, Terms and Conditions, Review, Machine Learning, Risk Management, Business Protection"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={redflagai.src} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />

      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={redflagai.src} />
    </Head>
  );
};

export default MetaData;
