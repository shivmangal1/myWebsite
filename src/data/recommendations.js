// TradingView chart thumbnail: https://s3.tradingview.com/snapshots/{id[0]}/{id}.png
// Chart ID is extracted from the URL path segment between last two slashes, before the first '-'
function thumb(url) {
  const segment = url.split('/').filter(Boolean).pop(); // e.g. "mUfqwmgC-Infosys-..."
  const id = segment.split('-')[0];
  return `https://s3.tradingview.com/snapshots/${id[0]}/${id}.png`;
}

const raw = {
  DIXON: 'https://in.tradingview.com/chart/INFY/mUfqwmgC-Infosys-Supply-Demand-Zone/',
  Graphite: 'https://in.tradingview.com/chart/GRAPHITE/MTLWNGUx-GRAPHITE/',
  HEG: 'https://in.tradingview.com/chart/HEG/bGca4ab1-HEG/',
  BPCL: 'https://in.tradingview.com/chart/BPCL/H4lQ1Vpm-BPCL/',
  IOCL: 'https://in.tradingview.com/chart/IOC/YvDn8SAI-INDIAOIL/',
  OIL: 'https://in.tradingview.com/chart/OIL/hk4bUVKS-OIL/',
  Hindpetro: 'https://in.tradingview.com/chart/HINDPETRO/MoV8bSf1-HINDPETRO/',
  PCBL: 'https://in.tradingview.com/chart/PCBL/IUO5oXPe-PCBL/',
  AdaniEnt: 'https://in.tradingview.com/chart/ADANIENT/PLo4GRNI-ADANIENT/',
  Shaktipump: 'https://in.tradingview.com/chart/SHAKTIPUMP/y75p7TwS-Shaktipump/',
  'Universal cable': 'https://in.tradingview.com/chart/UNIVCABLES/M688mnJa-UNIVERSALCABLE/',
  REC: 'https://in.tradingview.com/chart/RECLTD/V9nm6vLz-RECLTD/',
  PFC: 'https://in.tradingview.com/chart/PFC/FsEGekCe-PFC/',
  PowerGrid: 'https://in.tradingview.com/chart/POWERGRID/HcNRv818-PowerGRID/',
  TMPV: 'https://in.tradingview.com/chart/TMPV/WKiiNznu-TMPV/',
  TIMETECHNOPLAST: 'https://in.tradingview.com/chart/TIMETECHNO/cA37kdNr-TIMETECHNO/',
  LT: 'https://in.tradingview.com/chart/LT/BoFxK6ED-LT/',
  JBMAUTO: 'https://in.tradingview.com/chart/JBMA/0Fl3ijBj-JBMAUTO/',
  Olectra: 'https://in.tradingview.com/chart/OLECTRA/qNKc6rnG-OLECTRA/',
  BancoIndia: 'https://in.tradingview.com/chart/BANCOINDIA/Zjpm3mOZ-BANCOINDIA/',
  TorrentPower: 'https://in.tradingview.com/chart/TORNTPOWER/AA9Wl3yc-TORRENTPOWER/',
  SJVN: 'https://in.tradingview.com/chart/SJVN/KV5dBj4H-SJVN-supplyanddemand-zone/',
  PGIL: 'https://in.tradingview.com/chart/PGIL/IaAp9ba4-PGIL/',
  InfibeamTech: 'https://in.tradingview.com/chart/INFOBEAN/ONg3wrIM-Infobeam-Tech/',
  Prestige: 'https://in.tradingview.com/chart/PRESTIGE/n2Z62Xmx-Prestige/',
  ICICIBANK: 'https://in.tradingview.com/chart/ICICIBANK/Ib0ENjqh-ICICIBANK/',
  ApolloHospital: 'https://in.tradingview.com/chart/APOLLOHOSP/k7nU8Vqg-APOLLOHOSP/',
  PetronetLNG: 'https://in.tradingview.com/chart/PETRONET/KmZPCCVG-Petronet-LNG/',
  Glenmark: 'https://in.tradingview.com/chart/GLENMARK/U51Amfmt-Glenmark/',
  Sunpharma: 'https://in.tradingview.com/chart/SUNPHARMA/CZe4ACUB-SUNPHARMA/',
  Fortis: 'https://in.tradingview.com/chart/FORTIS/NeHrtAvj-FORTIS/',
  SBICARDS: 'https://in.tradingview.com/chart/SBICARD/MKj5skM7-SBICARDS/',
  Netweb: 'https://in.tradingview.com/chart/NETWEB/2VeGeRxH-Netweb/',
  Wipro: 'https://in.tradingview.com/chart/WIPRO/a9FNTN22-Wipro/',
  TCS: 'https://in.tradingview.com/chart/TCS/V8YPmzJm-TCS/',
  HCLTECH: 'https://in.tradingview.com/chart/HCLTECH/0pSyWxrt-HCLTECH/',
  Infy: 'https://in.tradingview.com/chart/INFY/P8Ep7BNZ-INFY/',
  MPHASIS: 'https://in.tradingview.com/chart/MPHASIS/NoP750bd-MPHASIS/',
  ITBEES: 'https://in.tradingview.com/chart/ITBEES/F1FrUnOF-ITBEES/',
  Sansera: 'https://in.tradingview.com/chart/SANSERA/YNd9Gqjd-Sansera/',
  LTIM: 'https://in.tradingview.com/chart/LTIM/VdFytts0-LTIMINDTREE/',
};

export const recommendations = Object.entries(raw).map(([name, url]) => ({
  name,
  url,
  thumb: thumb(url),
}));
