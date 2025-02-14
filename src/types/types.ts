export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export interface EditDialogProps {
  editingNote: Note | null;
  setEditingNote: (note: Note | null) => void;
  updateNote: (note: Note) => void;
}
