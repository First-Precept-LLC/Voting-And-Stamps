import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "c6WBZzg6csmgfkqzEBwH84",  // ID of a project you are using
      token: "QkEcbyjIWpoR8rUqy5KAtAgEzeUSuE3SPUq9jG3Wtuxo0GTpFBSwFiWoKO3OZ00nGHbRJEetc8ehFawSg"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})