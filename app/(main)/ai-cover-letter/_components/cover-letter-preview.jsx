"use client";

import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import htmlDocx from "html-docx-js/dist/html-docx";
import { Save, Download } from "lucide-react";
import { updateCover } from "@/actions/cover-letter";
import { toast } from "sonner";
import TurndownService from "turndown"; // ✅ HTML → Markdown converter

export default function CoverLetterEditor({ content, coverLetterId }) {
  const [html, setHtml] = useState(() => {
    return content?.includes("<p>") ? content : convertPlainToHtml(content || "");
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your cover letter here...",
      }),
    ],
    content: html,
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML());
    },
  });

  const saveChanges = async () => {
    try {
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(html); // ✅ Convert HTML → Markdown

      await updateCover({
        id: coverLetterId,
        content: markdown, // ✅ save as markdown
      });

      toast.success("Cover letter saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save cover letter");
    }
  };

  const generateDOCX = () => {
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body>
          <div style="font-family:Arial; font-size:12pt; line-height:1.75; white-space:pre-wrap;">
            ${html}
          </div>
        </body>
      </html>
    `;
    const blob = htmlDocx.asBlob(fullHtml);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Cover-Letter.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function convertPlainToHtml(text) {
    return text
      .split("\n\n")
      .map((para) => `<p>${para.replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }

  if (!editor) return <div className="p-6">Loading Editor...</div>;

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Cover Letter Editor</h2>
        <div className="flex gap-3">
          <Button onClick={saveChanges} className="cursor-pointer">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={generateDOCX} className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Download DOCX
          </Button>
        </div>
      </div>

      <div
        className="bg-white text-black border p-4 rounded min-h-[400px] prose max-w-none"
        style={{ whiteSpace: "pre-wrap", lineHeight: "1.75" }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
