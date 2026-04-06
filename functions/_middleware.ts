export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const hostname = url.hostname;

  // dufi.indoaquaworld.com → serve /dufi content at root
  if (hostname === 'dufi.indoaquaworld.com') {
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/dufi';
      return context.env.ASSETS.fetch(new Request(url.toString(), context.request));
    }
  }

  return context.next();
};
