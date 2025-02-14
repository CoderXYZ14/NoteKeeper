"use client";
import { cn } from "@/lib/utils";
import { Note } from "@/types/types";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import NoteCard from "./NoteCard";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NotePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        createdAt: Date.now(),
      };
      setNotes((prev) => [note, ...prev]);
      setNewNote({ title: "", content: "" });
      setIsExpanded(false);
      toast.success("Note added successfully");
    }
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    toast.error("Note deleted successfully");
  };

  const updateNote = (updatedNote: Note) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setEditingNote(null);
    toast.warning("Note updated successfully");
  };
  return (
    <main className="">
      <div className="max-w-2xl mx-auto mb-8">
        <div
          className={cn(
            "border rounded-lg shadow-sm bg-white dark:bg-[#202124] dark:border-gray-700",
            isExpanded ? "p-4" : "p-2"
          )}
        >
          {isExpanded && (
            <Input
              type="text"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote((prev) => ({ ...prev, title: e.target.value }))
              }
              className="mb-2 border-0 text-lg font-medium focus-visible:ring-0 bg-transparent"
            />
          )}
          <div className="flex items-start space-x-2">
            <Textarea
              placeholder="Take a note..."
              value={newNote.content}
              onChange={(e) =>
                setNewNote((prev) => ({ ...prev, content: e.target.value }))
              }
              onFocus={() => setIsExpanded(true)}
              className="min-h-[48px] border-0 focus-visible:ring-0 resize-none bg-transparent"
            />
            {!isExpanded && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(true)}
              >
                <Plus className="w-5 h-5" />
              </Button>
            )}
          </div>
          {isExpanded && (
            <div className="flex justify-end mt-4">
              <Button onClick={addNote}>Add Note</Button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onEdit={setEditingNote}
          />
        ))}
      </div>

      <Dialog open={editingNote} onOpenChange={() => setEditingNote(null)}>
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
                onChange={(e) =>
                  setEditingNote((prev) =>
                    prev ? { ...prev, title: e.target.value } : null
                  )
                }
                className="text-lg font-medium"
              />
              <Textarea
                placeholder="Take a note..."
                value={editingNote.content}
                onChange={(e) =>
                  setEditingNote((prev) =>
                    prev ? { ...prev, content: e.target.value } : null
                  )
                }
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
    </main>
  );
}
