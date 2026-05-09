import { NextResponse } from "next/server";
import { incidents } from "@/lib/mock-data/incidents";

type XUser = {
  id: string;
  name?: string;
  username?: string;
  verified?: boolean;
};

type XPost = {
  id: string;
  text: string;
  author_id?: string;
  created_at?: string;
  public_metrics?: {
    retweet_count?: number;
    reply_count?: number;
    like_count?: number;
    quote_count?: number;
  };
};

const demoIncident = incidents[0];

function classifyPost(text: string) {
  const normalized = text.toLowerCase();
  if (normalized.includes("fake") || normalized.includes("unverified") || normalized.includes("rumor")) {
    return "Fake Info Flag";
  }
  if (normalized.includes("warning") || normalized.includes("alert") || normalized.includes("exploit")) {
    return "Warning";
  }
  if (normalized.includes("confirmed") || normalized.includes("investigating") || normalized.includes("update")) {
    return "Confirmation";
  }
  return "Researcher";
}

function fallbackTweets(query: string) {
  return {
    live: false,
    source: "demo-fallback",
    query,
    tweets: demoIncident.tweets.map((tweet, index) => ({
      id: `demo-${index}`,
      author: tweet.author,
      handle: tweet.handle,
      time: tweet.time,
      content: tweet.content,
      tag: tweet.tag,
      url: "https://x.com",
      metrics: { likes: 0, reposts: 0, replies: 0 },
    })),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query =
    searchParams.get("q") ||
    `${demoIncident.affectedContracts[0]} OR ${demoIncident.protocol} -is:retweet lang:en`;
  const token = process.env.X_BEARER_TOKEN;

  if (!token) {
    return NextResponse.json(fallbackTweets(query));
  }

  const url = new URL("https://api.x.com/2/tweets/search/recent");
  url.searchParams.set("query", query);
  url.searchParams.set("max_results", "10");
  url.searchParams.set("tweet.fields", "created_at,public_metrics,author_id");
  url.searchParams.set("expansions", "author_id");
  url.searchParams.set("user.fields", "name,username,verified");

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        {
          ...fallbackTweets(query),
          source: "demo-fallback-x-error",
          error: `X API returned ${response.status}`,
          detail: detail.slice(0, 240),
        },
        { status: 200 },
      );
    }

    const payload = (await response.json()) as {
      data?: XPost[];
      includes?: { users?: XUser[] };
      meta?: { result_count?: number };
    };

    const users = new Map((payload.includes?.users || []).map((user) => [user.id, user]));
    const tweets =
      payload.data?.map((post) => {
        const user = post.author_id ? users.get(post.author_id) : undefined;
        const username = user?.username || "unknown";
        return {
          id: post.id,
          author: user?.name || username,
          handle: `@${username}`,
          time: post.created_at ? new Date(post.created_at).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" }) : "live",
          content: post.text,
          tag: classifyPost(post.text),
          url: `https://x.com/${username}/status/${post.id}`,
          metrics: {
            likes: post.public_metrics?.like_count || 0,
            reposts: post.public_metrics?.retweet_count || 0,
            replies: post.public_metrics?.reply_count || 0,
          },
        };
      }) || [];

    if (tweets.length === 0) {
      return NextResponse.json({
        ...fallbackTweets(query),
        source: "demo-fallback-no-results",
      });
    }

    return NextResponse.json({
      live: true,
      source: "x-recent-search",
      query,
      resultCount: payload.meta?.result_count || tweets.length,
      tweets,
    });
  } catch (error) {
    return NextResponse.json({
      ...fallbackTweets(query),
      source: "demo-fallback-network-error",
      error: error instanceof Error ? error.message : "Unknown X API error",
    });
  }
}
