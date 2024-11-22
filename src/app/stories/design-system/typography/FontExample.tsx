import React from "react";

const fonts = {
  gothic: [
    { weight: "thin", label: "Gothic A1 Thin", className: "gothic-thin" },
    { weight: "extralight", label: "Gothic A1 ExtraLight", className: "gothic-extralight" },
    { weight: "light", label: "Gothic A1 Light", className: "gothic-light" },
    { weight: "regular", label: "Gothic A1 Regular", className: "gothic-regular" },
    { weight: "medium", label: "Gothic A1 Medium", className: "gothic-medium" },
    { weight: "semibold", label: "Gothic A1 SemiBold", className: "gothic-semibold" },
    { weight: "bold", label: "Gothic A1 Bold", className: "gothic-bold" },
    { weight: "extrabold", label: "Gothic A1 ExtraBold", className: "gothic-extrabold" },
    { weight: "black", label: "Gothic A1 Black", className: "gothic-black" },
  ],
  school: [
    { weight: "regular", label: "학교안심 둥근미소 Regular", className: "font-school-regular" },
    { weight: "bold", label: "학교안심 둥근미소 Bold", className: "font-school-bold" },
  ],
};

const FontBox = ({ className, label }: { className: string; label: string }) => (
  <div className="mb-4">
    <p className={`${className} text-2xl`}>{label}</p>
  </div>
);

const FontExample = () => (
  <div>
    {Object.entries(fonts).map(([familyName, weights]) => (
      <div key={familyName}>
        <h2 className="mb-4 mt-8 text-xl font-bold capitalize">{familyName}</h2>
        {weights.map((font) => (
          <FontBox key={font.className} className={font.className} label={font.label} />
        ))}
      </div>
    ))}
  </div>
);

export default FontExample;
