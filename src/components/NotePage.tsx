"use client";
import { cn } from "@/lib/utils";
import { Note } from "@/types/types";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { NoteCard, EditDialog } from "./helper";

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
            <div className="flex justify-end mt-4 space-x-4">
              <Button onClick={addNote} className="bg-yellow-500">
                Add Note
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-5 h-5" />
              </Button>
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
      <EditDialog
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        updateNote={updateNote}
      />
    </main>
  );
}
