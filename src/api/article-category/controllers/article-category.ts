/**
 * article-category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article-category.article-category', ({strapi}) => ({
  async find(ctx){
    const entities = await strapi.db.query("api::article-category.article-category").findMany({
      select: [
        'title',
        'description',
        'meta_title',
        'meta_desc',
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

    const entities = await strapi.db.query("api::article-category.article-category").findOne({
      select: [
        'title',
        'description',
        'meta_title',
        'meta_desc',
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
}));
