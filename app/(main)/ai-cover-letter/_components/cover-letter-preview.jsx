"use client";

import React, { useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import htmlDocx from "html-docx-js/dist/html-docx";
import { Save, Download, Loader2 } from "lucide-react";
import { updateCover } from "@/actions/cover-letter";
import { toast } from "sonner";
import dynamic from "next/dynamic"; // ✅ needed for html2pdf SSR-safe import
import { useUser } from "@clerk/nextjs";
import TurndownService from "turndown";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const loadHtml2Pdf = () => import("html2pdf.js");
export default function CoverLetterEditor({ content, coverLetterId }) {
  const [phone, setPhone] = useState("555-555-5555");
  const letterRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [html, setHtml] = useState(() => {
    return content?.includes("<p>") ? content : convertPlainToHtml(content || "");
  });

  const { user, isLoaded } = useUser();
  const { imageUrl, fullName, emailAddresses } = user || {};
  const email = emailAddresses?.[0]?.emailAddress || "example@example.com";

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
      const markdown = turndownService.turndown(html);
      await updateCover({ id: coverLetterId, content: markdown });
      toast.success("Cover letter saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save cover letter");
    }
  };
 
// const generatePDF = async () => {
//   setIsGenerating(true);
//   try {
//     const element = letterRef.current;

//     if (!element) {
//       toast.error("Letter content not found.");
//       return;
//     }

//     // Clone node to manipulate styles safely
//     const clone = element.cloneNode(true);

//     // 🧼 Sanitize unsupported CSS (remove oklch)
//     clone.querySelectorAll("*").forEach((el) => {
//       const style = window.getComputedStyle(el);
//       if (style.color?.includes("oklch")) el.style.color = "#000"; // fallback black
//       if (style.backgroundColor?.includes("oklch")) el.style.backgroundColor = "#fff"; // fallback white
//     });


//     const canvas = await html2canvas(clone, {
//       scale: 2,
//       useCORS: true,
//     });


//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("coverLetter.pdf");

//     toast.success("PDF generated successfully!");
//   } catch (error) {
//     console.error("PDF generation error:", error);
//     toast.error("Failed to generate PDF.");
//   } finally {
//     setIsGenerating(false);
//   }
// };


  const generateDOCX = () => {
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body>
          <div style="font-family:Arial; font-size:12pt; line-height:1.75; white-space:pre-wrap;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
              <div style="width: 30px; height: 30px; border-radius: 4px; background-color: #4caf50;display:"inline">
                ${imageUrl ? `<img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" />` : ""}
              </div>
              <div>
                <strong style="font-size: 16pt;">${fullName}</strong><br/>
                📧 ${email}<br/>
                📞 ${phone}
              </div>
            </div>
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

  if (!editor || !isLoaded) return <div className="p-6">Loading Editor...</div>;

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      {/* Buttons */}
      <div className="flex gap-3">
        <Button onClick={saveChanges}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        {/* <Button onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 cursor-pointer" />
              Download PDF
            </>
          )}
        </Button> */}
        <Button onClick={generateDOCX}>
          <Download className="w-4 h-4 mr-2 cursor-pointer" />
          Download DOCX
        </Button>
      </div>

      {/* Cover Letter Body */}
      <div ref={letterRef} className="w-full max-w-4xl bg-white border p-6 rounded shadow" id="CoverLetter">
        {/* Header */}
        <div className="flex gap-4 items-center mb-6">
          {/* Image */}
          <div className="w-16 h-16 rounded bg-green-600 overflow-hidden">
            {imageUrl && <img src={imageUrl} alt="User" className="w-full h-full object-cover" />}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black tracking-wide">{fullName}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
              <div className="flex items-center gap-1">📧 {email}</div>
              <div className="flex items-center gap-1">
                📞
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="focus:outline-none focus:border-black text-sm bg-transparent w-32"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="text-black text-[14pt] leading-[1.75] font-[Arial,sans-serif] whitespace-pre-wrap prose max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
