export default function sitemap() {
  return [
    {
      url: 'https://www.tatoclemente.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://tatoclemente.dev/resume',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // {
    //   url: 'https://tatoclemente.dev/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: 'https://tatoclemente.dev/contact',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
  ]
}
