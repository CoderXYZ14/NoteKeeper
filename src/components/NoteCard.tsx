import { Note } from "@/types/types";
import { Button } from "./ui/button";
import { PencilIcon, Trash2 } from "lucide-react";

export default function NoteCard({
  note,
  onDelete,
  onEdit,
}: {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}) {
  return (
    <div className="group p-4 transition-shadow border rounded-lg hover:shadow-md bg-white dark:bg-[#202124] dark:border-gray-700">
      {note.title && <h3 className="mb-2 text-lg font-medium">{note.title}</h3>}
      <p className="text-gray-600 dark:text-gray-300">{note.content}</p>
      <div className="flex justify-end mt-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={() => onEdit(note)}>
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(note.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
