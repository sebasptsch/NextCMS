import { list } from "@keystone-next/keystone";
import {
  image,
  relationship,
  text,
  timestamp,
} from "@keystone-next/keystone/fields";
import { document } from "@keystone-next/fields-document";
import { componentBlocks } from "../componentBlocks";
import { kebabCase } from "lodash";
export const Post = list({
  fields: {
    title: text({
      db: { isNullable: false },
    }),
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
    summary: text({ db: { isNullable: false } }),
    image: image(),
    published_at: timestamp({ isOrderable: true, db: { isNullable: false } }),
    author: relationship({
      ref: "User.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineCreate: { fields: ["name", "email"] },
      },
    }),
    // We also link posts to tags. This is a many <=> many linking.
    tags: relationship({
      ref: "Tag.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] },
      },
      many: true,
    }),
    content: document({
      formatting: true,
      dividers: true,
      links: true,
      ui: {
        views: require.resolve("../componentBlocks"),
      },
      componentBlocks: { ...componentBlocks },
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { title } = resolvedData;
      if (title) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(title);
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
});
