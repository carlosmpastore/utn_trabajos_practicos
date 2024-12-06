enum F1Teams {
  RedBull = "Red Bull",
  Mercedes = "Mercedes",
  Ferrari = "Ferrari",
  McLaren = "McLaren",
  AstonMartin = "Aston Martin",
  Hass = "Haas",
  Sauber = "Sauber",
  Alpine = "Alpine",
  Williams = "Williams",
  AlphaTauri = "Alpha Tauri"
};

interface DriverData {
  name: string,
  nationality: string,
  team: F1Teams,
  number: number,
};

export { DriverData, F1Teams }