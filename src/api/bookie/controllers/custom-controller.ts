import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::bookie.bookie', ({strapi}) => ({
  async previewOffer(ctx){
    const { id: slug } = ctx.params

    const entries = await strapi.db.query("api::bookie.bookie").findMany({
      select: ['name', 'slug', 'url', 'description'],
      where: { categories: { slug } },
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
    })

    const randomEntries = [...entries].filter(b => !!b.bonuses.length).sort(() => 0.5 - Math.random());

    const sanitizedEntity = await this.sanitizeOutput(randomEntries.slice(0, 10), ctx)
    return this.transformResponse(sanitizedEntity, {})
  },
}))
