/**
 * bookie controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::bookie.bookie', ({strapi}) => ({
  async findOne(ctx) {
    const { id: slug } = ctx.params

    const entity = await strapi.db.query("api::bookie.bookie").findOne({
      select: [
        'name',
        'slug',
        'url',
        'description',
        'body'
      ],
      where: { slug },
      populate: {
        logo: {
          select: ['url']
        },
        categories: {
          select: ['name', 'slug']
        },
        bonuses: {
          select: ['name', 'title', 'body', 'isWelcome'],
          populate: {
            category: {
              select: ['id', 'name', 'slug']
            }
          }
        },
        features: {
          select: ['name']
        },
        offers: {
          select: ['name', 'description', 'body']
        },
        seo: {
          select: ['title', 'description']
        }
      } as any,
    })

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanitizedEntity, {})
  }
}));
