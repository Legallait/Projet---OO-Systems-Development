import React, { useMemo } from "react";

/**
 * @typedef {"LC"|"NT"|"VU"|"EN"|"CR"|"EW"|"EX"} ConservationRarity
 */

const RARITY = {
  LC: { label: "Préoccupation mineure", gachaName: "Commune", main: "#8a8f6f", dark: "#565c42", glowRgb: "138,143,111", price: 50 },
  NT: { label: "Quasi menacée", gachaName: "Peu commune", main: "#4a8f5c", dark: "#2c5638", glowRgb: "74,143,92", price: 150 },
  VU: { label: "Vulnérable", gachaName: "Rare", main: "#3d7bb8", dark: "#254e78", glowRgb: "61,123,184", price: 400 },
  EN: { label: "En danger", gachaName: "Super Rare", main: "#8a4bb0", dark: "#552b70", glowRgb: "138,75,176", price: 900 },
  CR: { label: "En danger critique", gachaName: "Ultra Rare", main: "#d9782d", dark: "#9c4d10", glowRgb: "217,120,45", price: 2000 },
  EW: { label: "Éteinte à l'état sauvage", gachaName: "Secrète", main: "#b8322f", dark: "#6e1917", glowRgb: "184,50,47", price: 4500 },
  EX: { label: "Éteinte", gachaName: "Légendaire", main: "#5b3a8f", dark: "#301b4d", glowRgb: "91,58,143", price: 10000 },
};

function formatPrice(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Carte gatcha façon TCG pour une espèce animale, avec rareté basée sur son statut de conservation UICN.
 *
 * @param {object} props
 * @param {string} [props.name] - Nom commun de l'espèce.
 * @param {string} [props.latinName] - Nom scientifique.
 * @param {ConservationRarity} [props.rarity] - Statut UICN (LC, NT, VU, EN, CR, EW, EX), pilote la couleur/aura/prix.
 * @param {string} [props.type] - Ligne de type façon TCG, ex. "[BÊTE / EFFET]".
 * @param {string} [props.description] - Texte descriptif de la carte.
 * @param {string} [props.quote] - Citation d'ambiance affichée sous la description.
 * @param {string} [props.imageUrl] - URL de l'illustration/photo.
 * @param {string} [props.imageAlt] - Texte alternatif de l'image.
 * @param {string} [props.cardCode] - Code de carte affiché sur l'illustration.
 * @param {string} [props.edition] - Mention d'édition en bas de carte.
 * @param {string} [props.photoCredit] - Crédit photo/illustration en bas de carte.
 * @param {number} [props.price] - Surcharge manuelle du prix (sinon dérivé de la rareté).
 */
export default function GachaAnimalCard({
  name = "Nom de l'espèce",
  latinName = "Genus species",
  rarity = "VU",
  type = "[BÊTE / EFFET]",
  description = "Description de l'espèce : habitat, comportement, régime alimentaire et menaces pesant sur sa survie.",
  quote = "« Une citation d'ambiance pour donner du caractère à la carte. »",
  imageUrl = "",
  imageAlt = "",
  cardCode = "ANM-000",
  edition = "Édition Limitée",
  photoCredit = "Photo : Prénom Nom (Licence)",
  price,
}) {
  const tier = RARITY[rarity] ?? RARITY.VU;
  const isLegendary = rarity === "EX";
  const priceDisplay = formatPrice(price ?? tier.price);

  const cardShadow = useMemo(
    () =>
      `inset 0 0 0 4px ${tier.main}, inset 0 0 0 6px rgba(255,255,255,0.35), ` +
      `0 0 42px 10px rgba(${tier.glowRgb},0.55), 0 0 86px 24px rgba(${tier.glowRgb},0.25), ` +
      `0 18px 40px rgba(0,0,0,0.6)`,
    [tier]
  );

  return (
    <div style={{ position: "relative", width: 480, padding: 40, boxSizing: "border-box", display: "inline-block" }}>
      <style>{`@keyframes gacha-spin { to { transform: rotate(360deg); } }`}</style>

      {isLegendary && (
        <div
          style={{
            position: "absolute",
            inset: 6,
            borderRadius: 30,
            background: "conic-gradient(from 0deg, #ff5c6c, #ffb703, #7ed957, #3d9be8, #a35bd9, #ff5c6c)",
            filter: "blur(24px)",
            opacity: 0.68,
            animation: "gacha-spin 9s linear infinite",
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          width: 400,
          boxSizing: "border-box",
          borderRadius: 20,
          padding: 12,
          background: "linear-gradient(155deg, #ecd8ab 0%, #cda662 45%, #93712f 100%)",
          boxShadow: cardShadow,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 12,
            borderRadius: 14,
            background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.3) 48%, transparent 66%)",
            pointerEvents: "none",
            mixBlendMode: "overlay",
          }}
        />

        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            borderRadius: 14,
            background: "#f6efe0",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 9,
            position: "relative",
            boxShadow: "inset 0 0 0 2px #93712f",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div
              style={{
                flex: 1,
                minWidth: 0,
                background: "#fbf6ea",
                borderRadius: 6,
                padding: "8px 10px",
                boxShadow: "inset 0 0 0 1px #cda662",
              }}
            >
              <div
                style={{
                  fontFamily: "Cinzel, Georgia, serif",
                  fontWeight: 700,
                  fontSize: 21,
                  lineHeight: 1.1,
                  color: "#211a10",
                  letterSpacing: 0.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </div>
              <div style={{ fontStyle: "italic", fontSize: 11.5, color: "#6b5a44", marginTop: 2 }}>{latinName}</div>
            </div>
            <div style={{ flexShrink: 0, width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
              <svg viewBox="0 0 100 100" width="46" height="46">
                <polygon points="50,4 92,27 92,73 50,96 8,73 8,27" fill={tier.main} stroke={tier.dark} strokeWidth="4" />
                <path d="M32 62 C40 40, 44 34, 50 26" stroke="#fffaf0" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M46 66 C54 44, 58 38, 64 30" stroke="#fffaf0" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M60 70 C68 48, 71 42, 76 34" stroke="#fffaf0" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px" }}>
            <span style={{ fontSize: 11, color: "#6b5a44" }}>
              Statut UICN : <strong style={{ color: "#211a10" }}>{tier.label}</strong> ({rarity})
            </span>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: 0.6,
                color: "#fdf6e8",
                background: tier.main,
                padding: "3px 10px",
                borderRadius: 20,
                textTransform: "uppercase",
                boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
              }}
            >
              {tier.gachaName}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px" }}>
            <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: 0.8, color: "#8a7a5e", textTransform: "uppercase" }}>
              Valeur de la carte
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700, color: tier.dark }}>
              <svg viewBox="0 0 24 24" width="13" height="13">
                <polygon points="12,2 21,9 17,22 7,22 3,9" fill={tier.main} stroke={tier.dark} strokeWidth="1.2" />
                <polygon points="12,2 21,9 12,12" fill="#ffffff" opacity="0.35" />
              </svg>
              {priceDisplay} Gemmes
            </span>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: 312,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: `inset 0 0 0 3px ${tier.main}, inset 0 0 0 5px #f6efe0, inset 0 0 0 7px #93712f`,
              flexShrink: 0,
              background: "#0c2420",
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageAlt || name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7a72",
                  fontSize: 12,
                  fontStyle: "italic",
                }}
              >
                Aucune image
              </div>
            )}
            <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 40px 10px rgba(0,0,0,0.35)", pointerEvents: "none" }} />
            <div
              style={{
                position: "absolute",
                bottom: 6,
                right: 8,
                background: "rgba(20,14,8,0.55)",
                color: "#f0e6d2",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: 0.5,
                padding: "2px 6px",
                borderRadius: 4,
              }}
            >
              {cardCode}
            </div>
          </div>

          <div
            style={{
              background: "#e4cfa0",
              color: "#241a10",
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 10px",
              borderRadius: 5,
              boxShadow: "inset 0 0 0 1px #93712f",
              flexShrink: 0,
            }}
          >
            {type}
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              background: "#fffaf0",
              border: "1px solid #d8c9a8",
              borderRadius: 6,
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#3a2e1e" }}>{description}</div>
            <div style={{ borderTop: "1px solid #d8c9a8" }} />
            <div style={{ fontSize: 11, fontStyle: "italic", lineHeight: 1.5, color: "#6b5a44" }}>{quote}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 9.5, fontStyle: "italic", color: "#8a7a5e" }}>{edition}</span>
            <span style={{ fontSize: 8.5, color: "#8a7a5e" }}>{photoCredit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
