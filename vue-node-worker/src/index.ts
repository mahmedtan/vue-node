addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const env = {
    API_URL_DEV: "https://rickandmortyapi.com/api/character/61",
    API_URL_TEST: "https://rickandmortyapi.com/api/character/281",
    API_URL_STAGING: "https://rickandmortyapi.com/api/character/628",
    API_URL_PRODUCTION: "https://rickandmortyapi.com/api/character/773",
    PRODUCTION_URL: "https://vue-node.pages.dev/",
    DEV_URL: "https://dev.vue-node.pages.dev/",
    TESTING_URL: "https://testing.vue-node.pages.dev/",
    STAGING_URL: "https://staging.vue-node.pages.dev/",
  };
  let API_URL;

  if (request.url === env.PRODUCTION_URL) API_URL = env.API_URL_PRODUCTION;
  else if (request.url === env.STAGING_URL) API_URL = env.API_URL_STAGING;
  else if (request.url === env.TESTING_URL) API_URL = env.API_URL_TEST;
  else API_URL = env.API_URL_DEV;

  const data = await (await fetch(API_URL)).json();

  return new Response(
    JSON.stringify({
      ...(data as any),
      url: request.url,
      headers: request.headers,
    }),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
