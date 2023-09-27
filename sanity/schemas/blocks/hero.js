// schemas/siteSettings.js
import { defineField, defineType } from 'sanity'
export default defineType({
    name: 'hero',
    title: 'Hero',
    blockTitle: 'Hero',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        }),
        defineField({
            name: 'bgImage',
            title: 'Background Image',
            type: 'image',
        }),
        defineField({
            name: 'badge',
            title: 'Badge',
            type: 'image',
        }),
        defineField({
            name: 'badgeText',
            title: 'Badge Text',
            type: 'string'
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'bgImage'
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: `Hero Block: ${title}`,
                subtitle: subtitle,
                media: media
            }
        }
    }
})

