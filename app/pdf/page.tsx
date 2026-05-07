"use client";

import React from "react";

const PDFPage = () => {
  const [file, setFile] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchResume = async () => {
      try {
        const payload = {
          name: "Zach",
        };

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        setFile(url);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();

    // cleanup blob URL
    return () => {
      if (file) {
        window.URL.revokeObjectURL(file);
      }
    };
  }, []);

  return (
    <div>
      {loading && <p>Generating PDF...</p>}

      {!loading && file && (
        <a href={file} target="_blank" rel="noopener noreferrer">
          Open Resume PDF
        </a>
      )}
    </div>
  );
};

export default PDFPage;
