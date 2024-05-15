/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({strapi}) => ({
  async find(ctx) {
    const entity = await strapi.db.query("api::article.article").findMany({
      select: [
        'id',
        'title',
        'description',
        'publishedAt',
        'slug'
      ],
      populate: {
        article_categories: {
          select: ['title', 'slug']
        },
        article_level: {
          select: ['title', 'slug']
        },
      }
    })

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanitizedEntity, {})
  },

  async findOne(ctx) {
    const { id: slug } = ctx.params

    const entity = await strapi.db.query("api::article.article").findOne({
      select: [
        'id',
        'title',
        'meta_title',
        'meta_desc',
        'description',
        'publishedAt',
        'body',
        'slug'
      ],
      where: { slug },
      populate: {
        article_categories: {
          select: ['title', 'slug']
        },
        article_level: {
          select: ['title', 'slug']
        },
      }
    })

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanitizedEntity, {})
  }
}));
