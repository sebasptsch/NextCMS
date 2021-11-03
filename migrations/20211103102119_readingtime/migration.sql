-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_mode" TEXT,
    "image_id" TEXT,
    "readingtime" TEXT NOT NULL DEFAULT '',
    "published_at" DATETIME NOT NULL,
    "author" TEXT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    CONSTRAINT "Post_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("author", "content", "id", "image_extension", "image_filesize", "image_height", "image_id", "image_mode", "image_width", "published_at", "slug", "summary", "title") SELECT "author", "content", "id", "image_extension", "image_filesize", "image_height", "image_id", "image_mode", "image_width", "published_at", "slug", "summary", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
CREATE INDEX "Post_author_idx" ON "Post"("author");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
