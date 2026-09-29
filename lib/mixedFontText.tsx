// Recebe uma frase que mistura texto e números (ex: "Cerimônia: 16h00")
// e separa automaticamente: os números ganham a fonte Cinzel,
// o resto do texto usa a fonte de texto padrão do site.
export function MixedFontText({ text }: { text: string }) {
  const parts = text.split(/(\d+)/g);

  return (
    <>
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <span key={i} className="font-numeros">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}