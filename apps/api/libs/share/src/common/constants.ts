export const CONFIG_KEYS = {
  MONGODB: "MONGODB",
};

export const PATHS = {
  CLUBS: "/clubs",
  EVENTS: "/club/:id/events"
};

export const COLLECTIONS = {
  CLUBS: {
    SINGULAR: 'club',
    PLURAL: 'clubs'
  },
  EVENTS: {
    SINGULAR: 'event',
    PLURAL: 'events',
  }
}

export const CONFIG_DEFAULT = {
  PORT: 3001,
  MONGODB_URI: "mongodb://root:example@localhost:27031/gameclub"
}

export const CACHE_1S = 1; //1
export const CACHE_2S = 2; //2
export const CACHE_5M = 300; //5*60
export const CACHE_10M = 600; //10*60
export const CACHE_15M = 900; //15*60
export const CACHE_30M = 1800; //30*60
export const CACHE_40M = 2400; //40*60
export const CACHE_60M = 3600; //60*60
export const CACHE_120M = 7200; //120*60

export const HEADER_CACHE_NO = "no-cache";
export const HEADER_CACHE_DEFAULT = `public, max-age=${CACHE_10M}, s-maxage=${CACHE_120M}`;
export const HEADER_CACHE_FAST = `public, max-age=${CACHE_10M}, s-maxage=${CACHE_30M}`;
export const HEADER_CACHE_FAST_LIVE = `public, max-age=${CACHE_40M}, s-maxage=${CACHE_60M}`;
export const HEADER_CACHE_1_SECOND = `public, max-age=${CACHE_1S}, s-maxage=${CACHE_1S}`;
export const HEADER_CACHE_2_SECONDS = `public, max-age=${CACHE_2S}, s-maxage=${CACHE_2S}`;
export const HEADER_CACHE_5_MINUTES = `public, max-age=${CACHE_5M}, s-maxage=${CACHE_5M}`;
export const HEADER_CACHE_10_MINUTES = `public, max-age=${CACHE_10M}, s-maxage=${CACHE_10M}`;
export const HEADER_CACHE_15_MINUTES = `public, max-age=${CACHE_15M}, s-maxage=${CACHE_15M}`;
export const HEADER_CACHE_30_MINUTES = `public, max-age=${CACHE_30M}, s-maxage=${CACHE_30M}`;
export const HEADER_CACHE_HOUR = `public, max-age=${CACHE_60M}, s-maxage=${CACHE_60M}`;