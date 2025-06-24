"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ResumeATSChecker() {
    const [file, setFile] = useState(null);
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jd", jd); // 👈 include JD here

        const res = await fetch("/api/ats-score", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log("data",data);
        setResult(data);
        setLoading(false);
    };

    return (
        <div className="space-y-4 max-w-[800] mx-auto">
            <form  className="space-y-4">
                <label className="block font-semibold">Upload Your Resume (PDF):</label>
                <Input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />

                <label className="block font-semibold mt-4">Paste Job Description:</label>
                <Textarea
                    rows={6}
                    className="w-full border rounded p-2"
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    placeholder="Paste the job description here..."
                />

                <Button
                    //  variant="filled"
                    type="button"
                    className="mb-2 cursor-pointer"
                    onClick={handleUpload}
                    disabled={!file || !jd}
                >
                   {loading ? (<>Checking</>) : (<>Check ATS Score</>)}
                </Button>
            </form>

            {result && (
                <div className="mt-6 bf-muted/50 p-4 rounded shadow">
                    <h2 className="text-4xl mb-6 text-muted-foreground font-bold">Result</h2>
                    <p><strong>Score:</strong> {result.score}%</p>
                    <p><strong>Summary:</strong> {result.summary}</p>
                    <p className="mt-2"><strong>Suggestions:</strong></p>
                    <ul className="list-disc pl-6">
                        {result.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
