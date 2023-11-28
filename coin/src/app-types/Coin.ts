import { BaseModel } from './Base';

export interface Coin extends BaseModel {
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: number;
  roi: null;
  last_updated: number;
}

export interface ListCoinParams {
  include_platform?: boolean;
}

export interface SearchCoinParams {
  q?: string;
}

export interface SearchCoinsResponse {
  coins: (Pick<Coin, 'id' | 'name' | 'market_cap_rank'> & {
    thumb: string;
    large: string;
    api_symbol: string;
    symbol: string;
  })[];
  categories: BaseModel[];
  exchanges: BaseModel &
    {
      large: string;
      market_type: string;
      name: string;
      thumb: string;
    }[];
  icos: unknown[];
  nfts: (BaseModel & { symbol: string; thumb: string })[];
}

export interface TrendingCoinsResponse {
  coins: {
    item: {
      coin_id: number;
      symbol: string;
      thumb: string;
      small: string;
      large: string;
      slug: string;
      price_btc: number;
      score: number;
    } & Pick<Coin, 'id' | 'name' | 'market_cap_rank'>;
  }[];
  nfts: BaseModel &
    {
      symbol: string;
      thumb: string;
      nft_contract_id: number;
      native_currency_symbol: string;
      floor_price_in_native_currency: string;
      floor_price_24h_percentage_change: string;
    }[];
  categories: BaseModel &
    {
      market_cap_1h_change: number;
      slug: string;
    }[];
  exchanges: unknown[];
}

export interface CoinResponse extends BaseModel {
  symbol: string;

  web_slug: string;
  asset_platform_id: string;
  platforms: {
    ethereum: string;
  };
  detail_platforms: {
    ethereum: {
      decimal_place: 18;
      contract_address: string;
    };
  };
  block_time_in_minutes: 0;
  hashing_algorithm: null;
  categories: string[];
  preview_listing: false;
  public_notice: null;
  additional_notices: [];
  localization: {
    en: string;
  };
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: [];
      bitbucket: [];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: null;
  contract_address: string;
  sentiment_votes_up_percentage: 73.21;
  sentiment_votes_down_percentage: 26.79;
  watchlist_portfolio_users: 610976;
  market_cap_rank: 20;
  coingecko_rank: 132;
  coingecko_score: 42.68;
  developer_score: 0;
  community_score: 56.215;
  liquidity_score: 66.79;
  public_interest_score: 0.01;
  market_data: {
    total_value_locked: null;
    mcap_to_tvl_ratio: null;
    fdv_to_tvl_ratio: null;
    roi: null;

    market_cap_rank: 20;

    market_cap_fdv_ratio: 0.59;

    price_change_24h: -1.53082547065e-7;
    price_change_percentage_24h: -1.8571;
    price_change_percentage_7d: -5.4085;
    price_change_percentage_14d: -8.62276;
    price_change_percentage_30d: 3.23755;
    price_change_percentage_60d: 10.90476;
    price_change_percentage_200d: -6.46787;
    price_change_percentage_1y: -14.40263;
    market_cap_change_24h: -81643742.00665;
    market_cap_change_percentage_24h: -1.68657;

    total_supply: number;
    max_supply: number | null;
    circulating_supply: number;
    last_updated: string;
  } & Record<
    | 'price_change_24h_in_currency'
    | 'price_change_percentage_1h_in_currency'
    | 'price_change_percentage_24h_in_currency'
    | 'price_change_percentage_7d_in_currency'
    | 'price_change_percentage_14d_in_currency'
    | 'price_change_percentage_30d_in_currency'
    | 'price_change_percentage_60d_in_currency'
    | 'price_change_percentage_200d_in_currency'
    | 'price_change_percentage_1y_in_currency'
    | 'market_cap_change_24h_in_currency'
    | 'market_cap_change_percentage_24h_in_currency'
    | 'current_price'
    | 'ath'
    | 'ath_change_percentage'
    | 'ath_date'
    | 'atl'
    | 'atl_change_percentage'
    | 'atl_date'
    | 'market_cap'
    | 'fully_diluted_valuation'
    | 'total_volume'
    | 'high_24h'
    | 'low_24h',
    {
      aed: number;
      ars: number;
      aud: number;
      bch: number;
      bdt: number;
      bhd: number;
      bmd: number;
      bnb: number;
      brl: number;
      btc: number;
      cad: number;
      chf: number;
      clp: number;
      cny: number;
      czk: number;
      dkk: number;
      dot: number;
      eos: number;
      eth: number;
      eur: number;
      gbp: number;
      hkd: number;
      huf: number;
      idr: number;
      ils: number;
      inr: number;
      jpy: number;
      krw: number;
      kwd: number;
      lkr: number;
      ltc: number;
      mmk: number;
      mxn: number;
      myr: number;
      ngn: number;
      nok: number;
      nzd: number;
      php: number;
      pkr: number;
      pln: number;
      rub: number;
      sar: number;
      sek: number;
      sgd: number;
      thb: number;
      try: number;
      twd: number;
      uah: number;
      usd: number;
      vef: number;
      vnd: number;
      xag: number;
      xau: number;
      xdr: number;
      xlm: number;
      xrp: number;
      yfi: number;
      zar: number;
      bits: number;
      link: number;
      sats: number;
    }
  >;
  community_data: {
    facebook_likes: null;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: number;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: {
      additions: any;
      deletions: any;
    };
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: any[];
  };
  public_interest_stats: {
    alexa_rank: number;
    bing_matches: any;
  };
  status_updates: any[];
  last_updated: string;
  tickers: {
    base: string;
    target: string;
    market: {
      name: string;
      identifier: string;
      has_trading_incentive: boolean;
    };
    last: number;
    volume: number;
    converted_last: {
      btc: number;
      eth: number;
      usd: number;
    };
    converted_volume: {
      btc: number;
      eth: number;
      usd: number;
    };
    trust_score: string;
    bid_ask_spread_percentage: number;
    timestamp: string;
    last_traded_at: string;
    last_fetch_at: string;
    is_anomaly: boolean;
    is_stale: boolean;
    trade_url: string;
    token_info_url: null;
    coin_id: string;
  }[];
}
