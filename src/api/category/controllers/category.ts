/**
 * category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::category.category', ({strapi}) => ({
  async findOne(ctx) {
    const { id: slug } = ctx.params

    const entity = await strapi.db.query("api::category.category").findOne({
      select: [
        'name',
        'slug',
      ],
      where: { slug },
      populate: {
        bookies: {
          select: ['name', 'slug', 'url', 'description'],
          populate: {
            logo: {
              select: ['url']
            },
            bonuses: {
              select: ['name', 'title'],
              where: {
                category: {
                  slug
                }
              },
              populate: {
                category: {
                  select: ['id', 'name', 'slug'],
                }
              }
            },
          },
        }
      }
    })

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanitizedEntity, {})
  }
}));
