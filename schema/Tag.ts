import { list } from "@keystone-next/keystone";
import { relationship, text } from "@keystone-next/keystone/fields";

export const Tag = list({
  ui: {
    isHidden: true,
  },
  fields: {
    name: text({ isFilterable: true, isIndexed: "unique" }),
    posts: relationship({ ref: "Post.tags", many: true }),
  },
});
