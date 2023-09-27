// schemas/siteSettings.js
import { defineField, defineType } from 'sanity'
export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
        }),
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string'
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text'
        }),
    ]
})