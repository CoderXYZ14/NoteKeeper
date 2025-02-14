import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { EditDialogProps, Note } from "@/types/types";

export default function EditDialog({
  editingNote,
  setEditingNote,
  updateNote,
}: EditDialogProps) {
  return (
    <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        {editingNote && (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              value={editingNote.title}
              onChange={(e) => {
                if (editingNote) {
                  setEditingNote({ ...editingNote, title: e.target.value });
                }
              }}
              className="text-lg font-medium"
            />
            <Textarea
              placeholder="Take a note..."
              value={editingNote.content}
              onChange={(e) => {
                if (editingNote) {
                  setEditingNote({ ...editingNote, content: e.target.value });
                }
              }}
              className="min-h-[200px]"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingNote(null)}>
                Cancel
              </Button>
              <Button onClick={() => editingNote && updateNote(editingNote)}>
                Save
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
