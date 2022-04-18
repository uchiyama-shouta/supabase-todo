import { atom } from "jotai";
import { EditedNotice } from "types/notice";

export const noticeAtom = atom<EditedNotice>({ id: "", content: "" });
