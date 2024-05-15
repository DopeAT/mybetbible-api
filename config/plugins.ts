export default () => ({
  'transformer': {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    }
  },
  ckeditor: {
    enabled: true,
    config: {
      link: {
        // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
        addTargetToExternalLinks: true,

        // Let the users control the "download" attribute of each link.
        decorators: [
          {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'download'
            }
          }
        ]
      }
    }
  },
});
