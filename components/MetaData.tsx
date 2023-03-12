import Head from "next/head";
import fire from "public/fire.png";
import redflagai from "public/redflagai.png";

type Props = {
  title?: string;
  description?: string;
};

const MetaData: React.FC<Props> = ({
  title = "RedflagAI",
  description = "RedFlag AI is a powerful tool that helps identify potential issues in your terms and conditions. With advanced machine learning algorithms, RedFlag AI highlight any problematic areas, allowing you to make informed decisions and minimize risk. Protect your business with RedFlag AI today.",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={fire.src} />
      <meta name="image" content={redflagai.src} />
      <title>RedflagAI</title>
      <meta
        name="description"
        content="RedFlag AI is a powerful tool that helps identify potential issues in your terms and conditions. With advanced machine learning algorithms, RedFlag AI highlight any problematic areas, allowing you to make informed decisions and minimize risk. Protect your business with RedFlag AI today."
      />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="https://www.redflagai.in/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="RedflagAI" />
      <meta
        property="og:description"
        content="RedFlag AI is a powerful tool that helps identify potential issues in your terms and conditions. With advanced machine learning algorithms, RedFlag AI highlight any problematic areas, allowing you to make informed decisions and minimize risk. Protect your business with RedFlag AI today."
      />
      <meta property="og:image" content={redflagai.src} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="redflagai.in" />
      <meta property="twitter:url" content="https://www.redflagai.in/" />
      <meta name="twitter:title" content="RedflagAI" />
      <meta
        name="twitter:description"
        content="RedFlag AI is a powerful tool that helps identify potential issues in your terms and conditions. With advanced machine learning algorithms, RedFlag AI highlight any problematic areas, allowing you to make informed decisions and minimize risk. Protect your business with RedFlag AI today."
      />
      <meta name="twitter:image" content={redflagai.src} />
    </Head>
  );
};

export default MetaData;
