module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/guides-preview',
      handler: 'custom-controller.guidesPreview'
    },
    {
      method: 'GET',
      path: '/bonus-guides-preview',
      handler: 'custom-controller.bonusGuidesPreview'
    }
  ]
}
