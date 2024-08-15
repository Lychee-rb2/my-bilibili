"use server";
import { login } from "../util/cookie";
import { t } from "../locale";
import { revalidateTag } from "next/cache";

export const loginAction = async (
  _: { message: string },
  formData: FormData,
) => {
  const cookie = formData.get("cookie") as string;
  const me = await login(cookie);
  revalidateTag("me");
  if (me) {
    return { message: "" };
  } else {
    return { message: t("Login fail") };
  }
};
