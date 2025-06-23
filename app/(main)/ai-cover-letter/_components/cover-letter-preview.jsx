"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { marked } from "marked";
import htmlDocx from "html-docx-js/dist/html-docx";

const CoverLetterPreview = ({ content }) => {
  const generateDOCX = async () => {
    try {
      // Convert Markdown to HTML
      const html = marked.parse(content);

      // Wrap it in full HTML document
      const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body>${html}</body>
        </html>
      `;

      // Generate DOCX blob
      const blob = htmlDocx.asBlob(fullHtml);

      // Create and trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Cover-Letter.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("DOCX generation error:", error);
    }
  };

  return (
    <div>
      <Button onClick={generateDOCX} className="cursor-pointer my-3 mt-0">
        <Download className="h-4 w-4" />
        Download DOCX
      </Button>

      <MDEditor value={content} preview="preview" height={700} />

      {/* Hidden markdown render (optional) */}
      <div className="hidden" id="cover-docx">
        <MDEditor.Markdown
          source={content}
          style={{ background: "white", color: "black" }}
        />
      </div>
    </div>
  );
};

export default CoverLetterPreview;
