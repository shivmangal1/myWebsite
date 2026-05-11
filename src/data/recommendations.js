// TradingView chart thumbnail: https://s3.tradingview.com/snapshots/{id[0]}/{id}.png
// Chart ID is extracted from the URL path segment between last two slashes, before the first '-'
function thumb(url) {
  const segment = url.split('/').filter(Boolean).pop(); // e.g. "mUfqwmgC-Infosys-..."
  const id = segment.split('-')[0];
  return `https://s3.tradingview.com/snapshots/${id[0]}/${id}.png`;
}

const raw = [
  {
    name: "DIXON",
    link: "https://in.tradingview.com/chart/INFY/mUfqwmgC-Infosys-Supply-Demand-Zone/"
  },
  {
    name: "Graphite",
    link: "https://in.tradingview.com/chart/GRAPHITE/MTLWNGUx-GRAPHITE/"
  },
  {
    name: "HEG",
    link: "https://in.tradingview.com/chart/HEG/bGca4ab1-HEG/"
  },
  {
    name: "BPCL",
    link: "https://in.tradingview.com/chart/BPCL/H4lQ1Vpm-BPCL/"
  },
  {
    name: "IOCL",
    link: "https://in.tradingview.com/chart/IOC/YvDn8SAI-INDIAOIL/"
  },
  {
    name: "OIL",
    link: "https://in.tradingview.com/chart/OIL/hk4bUVKS-OIL/"
  },
  {
    name: "Hindpetro",
    link: "https://in.tradingview.com/chart/HINDPETRO/MoV8bSf1-HINDPETRO/"
  },
  {
    name: "PCBL",
    link: "https://in.tradingview.com/chart/PCBL/IUO5oXPe-PCBL/"
  },
  {
    name: "AdaniEnt",
    link: "https://in.tradingview.com/chart/ADANIENT/PLo4GRNI-ADANIENT/"
  },
  {
    name: "Shaktipump",
    link: "https://in.tradingview.com/chart/SHAKTIPUMP/y75p7TwS-Shaktipump/"
  },
  {
    name: "Universal cable",
    link: "https://in.tradingview.com/chart/UNIVCABLES/M688mnJa-UNIVERSALCABLE/"
  },
  {
    name: "REC",
    link: "https://in.tradingview.com/chart/RECLTD/V9nm6vLz-RECLTD/"
  },
  {
    name: "PFC",
    link: "https://in.tradingview.com/chart/PFC/FsEGekCe-PFC/"
  },
  {
    name: "PowerGrid",
    link: "https://in.tradingview.com/chart/POWERGRID/HcNRv818-PowerGRID/"
  },
  {
    name: "TMPV",
    link: "https://in.tradingview.com/chart/TMPV/WKiiNznu-TMPV/"
  },
  {
    name: "TIMETECHNOPLAST",
    link: "https://in.tradingview.com/chart/TIMETECHNO/cA37kdNr-TIMETECHNO/"
  },
  {
    name: "LT",
    link: "https://in.tradingview.com/chart/LT/BoFxK6ED-LT/"
  },
  {
    name: "JBMAUTO",
    link: "https://in.tradingview.com/chart/JBMA/0Fl3ijBj-JBMAUTO/"
  },
  {
    name: "Olectra",
    link: "https://in.tradingview.com/chart/OLECTRA/qNKc6rnG-OLECTRA/"
  },
  {
    name: "BancoIndia",
    link: "https://in.tradingview.com/chart/BANCOINDIA/Zjpm3mOZ-BANCOINDIA/"
  },
  {
    name: "TorrentPower",
    link: "https://in.tradingview.com/chart/TORNTPOWER/AA9Wl3yc-TORRENTPOWER/"
  },
  {
    name: "SJVN",
    link: "https://in.tradingview.com/chart/SJVN/KV5dBj4H-SJVN-supplyanddemand-zone/"
  },
  {
    name: "PGIL",
    link: "https://in.tradingview.com/chart/PGIL/IaAp9ba4-PGIL/"
  },
  {
    name: "InfibeamTech",
    link: "https://in.tradingview.com/chart/INFOBEAN/ONg3wrIM-Infobeam-Tech/"
  },
  {
    name: "Prestige",
    link: "https://in.tradingview.com/chart/PRESTIGE/n2Z62Xmx-Prestige/"
  },
  {
    name: "ICICIBANK",
    link: "https://in.tradingview.com/chart/ICICIBANK/Ib0ENjqh-ICICIBANK/"
  },
  {
    name: "ApolloHospital",
    link: "https://in.tradingview.com/chart/APOLLOHOSP/k7nU8Vqg-APOLLOHOSP/"
  },
  {
    name: "PetronetLNG",
    link: "https://in.tradingview.com/chart/PETRONET/KmZPCCVG-Petronet-LNG/"
  },
  {
    name: "Glenmark",
    link: "https://in.tradingview.com/chart/GLENMARK/U51Amfmt-Glenmark/"
  },
  {
    name: "Sunpharma",
    link: "https://in.tradingview.com/chart/SUNPHARMA/CZe4ACUB-SUNPHARMA/"
  },
  {
    name: "Fortis",
    link: "https://in.tradingview.com/chart/FORTIS/NeHrtAvj-FORTIS/"
  },
  {
    name: "SBICARDS",
    link: "https://in.tradingview.com/chart/SBICARD/MKj5skM7-SBICARDS/"
  },
  {
    name: "Netweb",
    link: "https://in.tradingview.com/chart/NETWEB/2VeGeRxH-Netweb/"
  },
  {
    name: "Wipro",
    link: "https://in.tradingview.com/chart/WIPRO/a9FNTN22-Wipro/"
  },
  {
    name: "TCS",
    link: "https://in.tradingview.com/chart/TCS/V8YPmzJm-TCS/"
  },
  {
    name: "HCLTECH",
    link: "https://in.tradingview.com/chart/HCLTECH/0pSyWxrt-HCLTECH/"
  },
  {
    name: "Infy",
    link: "https://in.tradingview.com/chart/INFY/P8Ep7BNZ-INFY/"
  },
  {
    name: "MPHASIS",
    link: "https://in.tradingview.com/chart/MPHASIS/NoP750bd-MPHASIS/"
  },
  {
    name: "ITBEES",
    link: "https://in.tradingview.com/chart/ITBEES/F1FrUnOF-ITBEES/"
  },
  {
    name: "Sansera",
    link: "https://in.tradingview.com/chart/SANSERA/YNd9Gqjd-Sansera/"
  },
  {
    name: "LTIM",
    link: "https://in.tradingview.com/chart/LTIM/VdFytts0-LTIMINDTREE/"
  }
];

export const recommendations = raw.map((item) => ({
  name: item.name,
  url: item.link,
  thumb: thumb(item.link),
}));
