import { atom } from "jotai";
import { EditedTask } from "types/task";

export const taskAtom = atom<EditedTask>({ id: "", title: "" });
