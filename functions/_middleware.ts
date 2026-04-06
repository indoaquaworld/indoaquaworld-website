export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // dufi.indoaquaworld.com → serve /dufi content at root
  if (url.hostname === 'dufi.indoaquaworld.com') {
    if (url.pathname === '/' || url.pathname === '') {
      const rewritten = new URL('/dufi/', url.origin);
      return context.env.ASSETS.fetch(rewritten.toString());
    }
  }

  return context.next();
};
