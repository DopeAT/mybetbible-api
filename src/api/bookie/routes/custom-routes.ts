module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/preview/bookie/:id',
      handler: 'custom-controller.previewOffer'
    },
  ]
}
