import { respData, respErr } from "@/lib/resp";

import { Files } from "@/types/file";
import { currentUser } from "@clerk/nextjs";
import { findUserByEmail } from "@/models/user";
import { genUuid } from "@/lib";
import { insertFile } from "@/models/file";
import { uploadImage } from "@/lib/s3-spb";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("no auth");
  }
  const user_email = user.emailAddresses[0].emailAddress;

  let user_uuid = "";
  const user_info = await findUserByEmail(user_email);
  if (user_info && user_info.uuid) {
    user_uuid = user_info.uuid;
  }

  const formData = await req.formData();

  const img_description = formData.get("img_description") as string;
  // const llm_name = formData.get("llm_name") as string;
  const img_file = formData.get("file") as File;

  const img_size = img_file.size;
  const img_type = img_file.type;

  if (!img_type.startsWith("image/")) {
    return respErr("invalid file type");
  }
  // max size: 10M
  if (img_size > 10485760) {
    return respErr("max file size up to 10MB");
  }

  try {
    const created_at = new Date().toISOString();
    const img_uuid = genUuid();
    const currnet_time = new Date().getTime();

    const s3_img = await uploadImage(
      img_file,
      process.env.AWS_BUCKET || "resource-online",
      `file/${currnet_time}/${img_uuid}.png`
    );

    console.log("s3_img===>", s3_img);
    const file: Files = {
      img_description: img_description,
      img_size: `${img_size}B`,
      img_url: s3_img,
      created_at: created_at,
      user_uuid: user_uuid,
    };
    await insertFile(file);
    return respData(file);
  } catch (e) {
    console.log("upload file failed: ", e);
    return respErr("upload cover failed");
  }
}
