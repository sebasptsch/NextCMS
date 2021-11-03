import { list } from "@keystone-next/keystone";
import { password, relationship, text } from "@keystone-next/keystone/fields";
import { kebabCase } from "lodash";

export const User = list({
  // Here are the fields that `User` will have. We want an email and password so they can log in
  // a name so we can refer to them, and a way to connect users to posts.
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    bio: text(),
    slug: text({
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "read",
        },
      },
    }),
    // The password field takes care of hiding details and hashing values
    password: password({ validation: { isRequired: true } }),
    // Relationships allow us to reference other lists. In this case,
    // we want a user to have many posts, and we are saying that the user
    // should be referencable by the 'author' field of posts.
    // Make sure you read the docs to understand how they work: https://keystonejs.com/docs/guides/relationships#understanding-relationships
    posts: relationship({ ref: "Post.author", many: true }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { name } = resolvedData;
      if (name) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(name);
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: ["name", "posts"],
    },
  },
});
