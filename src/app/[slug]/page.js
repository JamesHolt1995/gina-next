import Nav from "@/Components/Nav";
import { getSiteData, getNavData, getPageData } from "@/Client";
import Hero from '@/Components/Hero';
import { PortableText } from '@portabletext/react'


export const revalidate = 0

export async function generateMetadata({ params }) {
    const slug = params.slug
    const page = await getPageData(slug)
    const title = page ? page.title : 'not found'
    return {
        title: title,
    }
}

const portableTextComponents = {
    types: {
        hero: ({ value }) => <Hero data={value} timeIndex={0} />,
    }
}


export default async function Page({ params }) {

    const slug = params.slug
    const page = await getPageData(slug)
    const siteData = await getSiteData()
    const navData = await getNavData()

    if (page && siteData) {
        return (
            <>
                <Nav siteData={siteData} navData={navData} timeIndex={0.5} />

                <PortableText
                    value={page.body}
                    components={portableTextComponents}
                />

            </>
        )
    } else {
        return (
            <>
                <div>not found</div>
            </>
        )
    }

}
