/**
 * article-level controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article-level.article-level', ({strapi}) => ({
  async find(ctx){
    const entities = await strapi.db.query("api::article-level.article-level").findMany({
      select: [
        'title',
        'slug',
      ],
      populate: {
        articles: {
          select: ['title', 'description', 'slug'],
          populate: {
            article_categories: {
              select: ['title', 'slug']
            },
            article_level: {
              select: ['title', 'slug']
            },
          }
        }
      }
    })

    const sanitizedEntity = await this.sanitizeOutput(entities, ctx)
    return this.transformResponse(sanitizedEntity, {})
  },

  async findOne(ctx){
    const { id: slug } = ctx.params

    const entities = await strapi.db.query("api::article-level.article-level").findOne({
      select: [
        'title',
        'slug',
      ],
      where: { slug },
      populate: {
        articles: {
          select: ['title', 'description', 'slug'],
          populate: {
            article_categories: {
              select: ['title', 'slug']
            },
          }
        }
      }
    })

    const sanitizedEntity = await this.sanitizeOutput(entities, ctx)
    return this.transformResponse(sanitizedEntity, {})
  },
}));
