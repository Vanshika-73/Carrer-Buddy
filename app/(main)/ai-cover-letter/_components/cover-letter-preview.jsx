"use client";

import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import htmlDocx from "html-docx-js/dist/html-docx";
import { Save, Download, Loader2 } from "lucide-react";
import { updateCover } from "@/actions/cover-letter";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";

import TurndownService from "turndown"; // ✅ HTML → Markdown converter

export default function CoverLetterEditor({ content, coverLetterId }) {
  const [html, setHtml] = useState(() => {
    return content?.includes("<p>") ? content : convertPlainToHtml(content || "");
  });
  const [suggestions, setSuggestions] = useState([]);
  const [popupPosition, setPopupPosition] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
const extractRelevantWord = (text) => {
  const stopwords = ["the", "is", "in", "and", "of", "to", "a", "for", "with"];
  const words = text
    .split(/\s+/)
    .map((w) => w.trim().replace(/[^\w]/g, "").toLowerCase())
    .filter((w) => w.length > 2 && !stopwords.includes(w));

  // Choose the longest or most "complex" word
  return words.sort((a, b) => b.length - a.length)?.[0];
};

const handleClickSelectedWord = async () => {
  if (!editor) return;

  const { from, to } = editor.state.selection;
  const rawSelection = editor.state.doc.textBetween(from, to).trim();

  if (!rawSelection) return;

  const word =
    rawSelection.includes(" ") ? extractRelevantWord(rawSelection) : rawSelection;

  if (!word || word.length < 2) return;

  try {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const res = await fetch("/api/synonyms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        context: rawSelection,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to fetch synonyms");
      return;
    }

    const cleanSuggestions = [...new Set(data.synonyms)].slice(0, 5);

    setSelectedWord(word);
    setSuggestions(cleanSuggestions);
    setPopupPosition({ x: rect.left, y: rect.bottom });
  } catch (err) {
    console.error(err);
    toast.error("Error fetching synonyms");
  }
};


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
  React.useEffect(() => {
  if (!editor) return;

  const handler = () => {
    const { from, to } = editor.state.selection;
    if (to - from > 0) {
      handleClickSelectedWord(); // ✅ call the fixed function
    } else {
      setSuggestions([]);
    }
  };

  editor.view.dom.addEventListener("mouseup", handler);
  return () => editor.view.dom.removeEventListener("mouseup", handler);
}, [editor]);


  const saveChanges = async () => {
    try {
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(html); // ✅ Convert HTML → Markdown
      console.log("coverLetter", coverLetterId);
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
 const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("CoverLetter");
      const opt = {
        margin: [15, 15],
        filename: "coverLetter.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
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
          <Button onClick={saveChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating} className="cursor-pointer">
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Download PDF
                        </>
                      )}
                    </Button>
          <Button onClick={generateDOCX}>
            <Download className="w-4 h-4 mr-2" />
            Download DOCX
          </Button>
        </div>
      </div>
      <h2 className="text-muted-foreground text-center">Select any word to get its synonyms!!</h2>
      <div
        className="bg-white text-black border p-4 rounded min-h-[400px] prose max-w-none"
        style={{ whiteSpace: "pre-wrap", lineHeight: "1.75" }} id="CoverLetter"
      >
        <EditorContent editor={editor} />
        {popupPosition && suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: popupPosition.y + window.scrollY + 8,
              left: popupPosition.x + window.scrollX,
              zIndex: 9999,
            }}
            className="bg-white text-black border rounded p-2 shadow"
          >
            <p className="text-sm font-semibold">Synonyms for "{selectedWord}"</p>
            {suggestions.map((syn) => (
              <div
                key={syn}
                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                onClick={() => {
                  const { from, to } = editor.state.selection;
                  editor.chain().focus().insertContentAt({ from, to }, syn).run();
                  setSuggestions([]);
                }}
              >
                {syn}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
