import React from "react";

const page = () => {
  return (
    <html lang="en">
      <head>
        <title>PDF Export</title>
        <style>{`body { margin: 0; background: white; font-family: Arial, sans-serif; }`}</style>
      </head>
      <body>
        <div style={{ padding: "20px" }}>
          <h1>Mi PDF generado</h1>
          <p>Este es el contenido que se exportará como PDF</p>
        </div>
      </body>
    </html>
  );
};

export default page;
