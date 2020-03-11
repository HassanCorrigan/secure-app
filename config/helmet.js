module.exports = {
  contentSecurityPolicy: {
    directives: {
      baseUri: ["'self'"],
      connectSrc: ["'self'"],
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", 'https://use.fontawesome.com'],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      frameSrc: ["'self'", 'https://www.google.com'],
      imgSrc: ["'self'", 'data:', 'https://cdn.dribbble.com'],
      scriptSrc: [
        "'self'",
        (req, res) => `'nonce-${res.locals.nonce}'`,
        'https://www.google.com',
        'https://code.jquery.com',
        'https://cdnjs.cloudflare.com',
        'https://stackpath.bootstrapcdn.com',
        'https://momentjs.com',
        'https://www.google.com'
      ],
      styleSrc: [
        "'self'",
        'https://stackpath.bootstrapcdn.com',
        'https://use.fontawesome.com'
      ]
    }
  },
  featurePolicy: {
    features: {
      geolocation: ["'none'"]
    }
  },
  referrerPolicy: {
    policy: 'no-referrer'
  }
};
