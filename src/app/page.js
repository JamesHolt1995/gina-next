import { client, getSiteData, getPageData, getNavData } from "@/Client";
import Hero from '@/Components/Hero';
import Nav from "@/Components/Nav";
import { PortableText } from '@portabletext/react'


export const revalidate = 0

export async function generateMetadata({ params }) {
  const data = await getSiteData()
  return {
    title: data.title,
  }
}

const portableTextComponents = {
  types: {
    hero: ({ value }) => <Hero data={value} timeIndex={0} />,
  }
}

export default async function Home() {

  const slug = 'home'
  const page = await getPageData(slug)
  const siteData = await getSiteData()
  const navData = await getNavData()

  if (page && siteData && navData) {
    return (
      <>
        <Nav siteData={siteData} navData={navData} />
        <PortableText
          value={page.body}
          components={portableTextComponents}
        />
      </>
    );
  }
}



