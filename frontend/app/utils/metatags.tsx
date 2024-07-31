import Head from 'next/head';

type MetaTagsProps = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
};

const MetaTags = ({ title, description, imageUrl, url }: MetaTagsProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default MetaTags;