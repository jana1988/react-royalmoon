export const isHorizontal = (
  gameApiId = null,
  gameCode = "",
  gameApiCode = "",
) =>
  ![
    { gameApiId: 30 },
    { gameApiCode: "SoftGamingsSolidGaming", gameCode: "GHG_OIRAN_DREAM" },
    { gameApiCode: "SoftGamingsSolidGaming", gameCode: "GHG_HAWAIIAN_DREAM" },
    { gameApiCode: "SoftGamingsSolidGaming", gameCode: "GHG_BATTLE_DWARF" },
    { gameApiCode: "SoftGamingsSolidGaming", gameCode: "GHG_DREAMS_OF_GOLD" },
    {
      gameApiCode: "SoftGamingsSolidGaming",
      gameCode: "GHG_HAWAIIAN_DREAM_XMAS",
    },
    {
      gameApiCode: "SoftGamingsSolidGaming",
      gameCode: "GHG_DREAMS_OF_GOLD_DELIGHT",
    },
    {
      gameApiCode: "SoftGamingsSolidGaming",
      gameCode: "GHG_RAIGEKI_RISING_X30",
    },
    {
      gameApiCode: "SoftGamingsSolidGaming",
      gameCode: "GHG_ENGEKI_RISING_X50",
    },
    {
      gameApiCode: "SoftGamingsSolidGaming",
      gameCode: "GHG_BATTLE_DWARF_XMAS",
    },
  ].find(
    // (item) => item.gameApiId == gameApiId,

    (item) =>
      item.gameApiId == gameApiId ||
      (item.gameApiCode == gameApiCode && item.gameCode == gameCode),
  );

export const isTarget = (gameApiId = null) =>
  [{ gameApiId: 91 }, { gameApiId: 92 }, { gameApiId: 1019 }].find(
    (item) => item.gameApiId == gameApiId,
  );
