import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from '../sanity/env'

export const client = createClient({
    projectId: projectId,
    dataset: dataset,
    apiVersion: apiVersion,
    useCdn: false,
});

export async function getPageData(slug) {
    const page = await client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug })
    return page
}

const imageBuilder = imageUrlBuilder(client);
export function urlFor(source) {
    return imageBuilder.image(source);
}


export async function getSiteData() {
    const res = await client.fetch(`*[_type == "siteSettings"][0]`)

    if (!res) {
        throw new Error('Failed to fetch data')
    }

    return res

}



export async function getNavData() {
    const res = await client.fetch(`*[_type == "navigation" && navId.current == "main"][0]{
    items[] {
      text,
        navigationItemUrl {
          externalUrl,
          "internalSlug" : internalLink->slug.current
        }
      }
    }`)

    if (!res) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.items
}