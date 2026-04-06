export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  if (url.hostname === 'dufi.indoaquaworld.com') {
    if (url.pathname === '/' || url.pathname === '') {
      const rewritten = new URL('/dufi/', url.origin);
      const response = await context.env.ASSETS.fetch(rewritten.toString());
      return new Response(response.body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          'x-middleware': 'dufi-rewrite',
        },
      });
    }
  }

  const response = await context.next();
  return new Response(response.body, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers.entries()),
      'x-middleware': 'passthrough',
    },
  });
};
