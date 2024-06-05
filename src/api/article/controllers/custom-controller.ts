import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({strapi}) => ({
  async guidesPreview(ctx){
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
      },
      where: {
        id: {
          $in: [1, 3, 4, 5]
        }
      }
    })

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanitizedEntity, {})
  },
  async bonusGuidesPreview(ctx){
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
      },
      where: {
        id: {
          $in: [6, 2]
        }
      }
    })

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanitizedEntity, {})
  },
}))
