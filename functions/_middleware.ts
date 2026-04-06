export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  if (url.hostname === 'dufi.indoaquaworld.com') {
    if (url.pathname === '/' || url.pathname === '') {
      // Fetch the /dufi/index.html page from static assets
      const rewritten = new URL('/dufi/', url.origin);
      const response = await context.env.ASSETS.fetch(rewritten.toString());
      return new Response(response.body, {
        status: response.status,
        headers: response.headers,
      });
    }
  }

  return context.next();
};
