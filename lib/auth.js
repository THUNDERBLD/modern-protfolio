import bcrypt from "bcryptjs";
import crypto from "crypto";

export const ADMIN_COOKIE = "faraz_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

const normalizeEnvValue = (value = "") => {
  return String(value).trim().replace(/^['"]|['"]$/g, "").replace(/\\\$/g, "$");
};

const getAdminId = () => normalizeEnvValue(process.env.ADMIN_ID);
const getPasswordHash = () => normalizeEnvValue(process.env.ADMIN_PASSWORD_HASH);
const getSecret = () => normalizeEnvValue(process.env.ADMIN_SESSION_SECRET);

const sign = (value) => {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
};

export const createSessionToken = () => {
  const payload = {
    sub: getAdminId(),
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload)}`;
};

export const verifySessionToken = (token) => {
  if (!token || !getSecret()) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = sign(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    return payload.sub === getAdminId() && payload.exp > Math.floor(Date.now() / 1000);
  } catch (error) {
    return false;
  }
};

export const verifyAdminCredentials = async (id, password) => {
  const adminId = getAdminId();
  const passwordHash = getPasswordHash();
  const secret = getSecret();
  const submittedId = normalizeEnvValue(id);
  const submittedPassword = String(password || "");

  console.log("[admin-login] env status", {
    hasAdminId: Boolean(adminId),
    hasPasswordHash: Boolean(passwordHash),
    hasSessionSecret: Boolean(secret),
    hashPrefix: passwordHash.slice(0, 4),
    hashLength: passwordHash.length,
  });

  if (!adminId || !passwordHash || !secret) {
    console.log("[admin-login] failed: missing admin env configuration");
    return { ok: false, reason: "Admin environment variables are not configured." };
  }

  if (!passwordHash.startsWith("$2")) {
    console.log("[admin-login] failed: password hash is malformed. Escape $ characters in .env, for example ADMIN_PASSWORD_HASH=\\$2b\\$12\\$...");
    return { ok: false, reason: "Admin password hash is malformed. Check server console." };
  }

  if (submittedId !== adminId || !submittedPassword) {
    console.log("[admin-login] failed: id mismatch or empty password", {
      idMatches: submittedId === adminId,
      hasSubmittedPassword: Boolean(submittedPassword),
    });
    return { ok: false, reason: "Invalid credentials." };
  }

  const passwordOk = await bcrypt.compare(submittedPassword, passwordHash);
  console.log("[admin-login] password compare result", { passwordOk });

  return passwordOk ? { ok: true } : { ok: false, reason: "Invalid credentials." };
};

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
