const VISUALS = [
    {
        match: ["savane"],
        image: "/images/boosters/savane.png",
        focus: "68% 50%",
        accent: "#F2B45A",
        fallbackGradient: "linear-gradient(135deg, #7A3B1E, #D97A3D, #F2B45A)",
    },
    {
        match: ["froid", "polaire", "arctique"],
        image: "/images/boosters/froid.png",
        focus: "28% 45%",
        accent: "#7CD3F0",
        fallbackGradient: "linear-gradient(135deg, #0B1F3A, #1F4E6B, #A8D8E8)",
    },
    {
        match: ["océan", "ocean"],
        image: "/images/boosters/ocean.png",
        focus: "50% 45%",
        accent: "#4FA8D8",
        fallbackGradient: "linear-gradient(135deg, #0B2A4A, #14568C, #4FA8D8)",
    },
    {
        match: ["forêt", "foret"],
        image: "/images/boosters/foret.png",
        focus: "48% 40%",
        accent: "#5FBF7F",
        fallbackGradient: "linear-gradient(135deg, #0F2E1C, #1F5B37, #3E8B57)",
    },
];

const DEFAULT_VISUAL = {
    image: null,
    focus: "50% 50%",
    accent: "#C9A24B",
    fallbackGradient: "linear-gradient(135deg, #2A1F06, #C9A24B, #F2D98A)",
};

export function resolveBoosterVisual(name = "") {
    const normalized = name.toLowerCase();
    const found = VISUALS.find((v) => v.match.some((keyword) => normalized.includes(keyword)));
    const { match, ...visual } = found ?? { ...DEFAULT_VISUAL };
    return visual;
}
