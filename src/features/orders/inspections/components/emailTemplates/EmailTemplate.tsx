import * as React from "react";

interface EmailTemplateProps {
  recipientName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  recipientName,
}) => (
  <div>
    <h1>Hola {recipientName} 👋</h1>
    <p>Tu inspección fue registrada correctamente.</p>
    <p>Gracias por usar nuestro sistema.</p>
  </div>
);
