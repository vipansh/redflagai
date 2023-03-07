import Head from "next/head";
import fire from "public/fire.png";
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
    </Head>
  );
};

export default MetaData;
