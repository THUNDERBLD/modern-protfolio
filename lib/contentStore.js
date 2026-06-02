import { fallbackContent, normalizeContent } from "./fallbackContent";
import { getDb } from "./mongodb";

const COLLECTION = "portfolio_content";
const SLUG = "main";

export const getContent = async () => {
  try {
    const db = await getDb();
    const content = await db.collection(COLLECTION).findOne({ slug: SLUG }, { projection: { _id: 0 } });
    return normalizeContent(content || fallbackContent);
  } catch (error) {
    return normalizeContent(fallbackContent);
  }
};

export const getAdminContent = async () => {
  try {
    const db = await getDb();
    const content = await db.collection(COLLECTION).findOne({ slug: SLUG }, { projection: { _id: 0 } });
    return normalizeContent(content || fallbackContent);
  } catch (error) {
    return normalizeContent(fallbackContent);
  }
};

export const saveContent = async (content) => {
  const db = await getDb();
  const normalized = {
    ...normalizeContent(content),
    slug: SLUG,
    updatedAt: new Date().toISOString(),
  };

  // Strip fields that conflict with $setOnInsert or are immutable
  const { _id, createdAt, ...setPayload } = normalized;

  await db.collection(COLLECTION).updateOne(
    { slug: SLUG },
    { $set: setPayload, $setOnInsert: { createdAt: createdAt || new Date().toISOString() } },
    { upsert: true }
  );

  return normalized;
};
