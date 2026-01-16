import { CoffeeProductMarketplace, RoastLevel } from "../../domain/models/CoffeeProduct";

export type MarketplaceProductView = {
  title: string;
  subtitle: string;
  primaryImageUrl: string | null;
  priceLabel: string;
  availability: boolean;
  roastBadge: string | null;
  originLabel: string;
  ctaLabel: string;
  ctaDisabled: boolean;
};

const DEFAULT_ORIGIN = "Unknown origin";
const DEFAULT_PRICE = "Price unavailable";
const CTA_AVAILABLE = "View";
const CTA_UNAVAILABLE = "Sold out";

export function buildMarketplaceProductView(
  product: CoffeeProductMarketplace
): MarketplaceProductView {
  const coffee = product.coffeeProduct;
  const originLabel = buildOriginLabel(coffee.origin?.country ?? null, coffee.origin?.region ?? null);
  const roasterLabel = coffee.roasterName ?? coffee.shop?.name ?? null;
  const subtitleParts = [roasterLabel, originLabel].filter(Boolean);

  return {
    title: coffee.fullLabelText ?? coffee.name,
    subtitle: subtitleParts.join(" • "),
    primaryImageUrl: getPrimaryImageUrl(coffee.imageUrls),
    priceLabel: formatPriceLabel(product.priceMinor, product.currency),
    availability: product.isAvailable,
    roastBadge: formatRoastBadge(coffee.roastLevel),
    originLabel,
    ctaLabel: product.isAvailable ? CTA_AVAILABLE : CTA_UNAVAILABLE,
    ctaDisabled: !product.isAvailable,
  };
}

function buildOriginLabel(country: string | null, region: string | null): string {
  // Default origin keeps UI consistent even when origin data is missing.
  const label = [country, region].filter(Boolean).join(", ");
  return label || DEFAULT_ORIGIN;
}

function getPrimaryImageUrl(imageUrls: string[] | null): string | null {
  // Default image is handled in UI with a placeholder when no URL is available.
  if (!imageUrls || imageUrls.length === 0) return null;
  return imageUrls[0];
}

function formatRoastBadge(roastLevel: RoastLevel | null): string | null {
  if (!roastLevel || roastLevel === "UNKNOWN") return null;
  return formatEnumLabel(roastLevel);
}

function formatPriceLabel(priceMinor: number | null, currency: string | null): string {
  // Default price label avoids blank UI when price data is missing.
  if (priceMinor == null || !currency) return DEFAULT_PRICE;
  if (typeof Intl === "undefined") {
    return `${currency} ${(priceMinor / 100).toFixed(2)}`;
  }
  try {
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    });
    const digits = formatter.resolvedOptions().maximumFractionDigits;
    const amount = priceMinor / Math.pow(10, digits);
    return formatter.format(amount);
  } catch {
    return `${currency} ${(priceMinor / 100).toFixed(2)}`;
  }
}

function formatEnumLabel(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}
