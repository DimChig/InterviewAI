// /types/chessRating.ts

/**
 * Post‐move chess ratings, now matching your 0–10 icon files.
 */
export enum ChessRating {
  Book = 0,
  Blunder = 1,
  Incorrect = 2,
  Mistake = 3,
  Inaccuracy = 4,
  Ok = 5,
  Good = 6,
  Great = 7,
  Excellent = 8,
  Best = 9,
  Perfect = 10,
}

/** Where to find each icon in `/public/images/chess/` */
export const ChessRatingImagePath: Record<ChessRating, string> = {
  [ChessRating.Book]: "/images/chess/0_book.png",
  [ChessRating.Blunder]: "/images/chess/1_blunder.png",
  [ChessRating.Incorrect]: "/images/chess/2_incorrect.png",
  [ChessRating.Mistake]: "/images/chess/3_mistake.png",
  [ChessRating.Inaccuracy]: "/images/chess/4_inaccuracy.png",
  [ChessRating.Ok]: "/images/chess/5_ok.png",
  [ChessRating.Good]: "/images/chess/6_good.png",
  [ChessRating.Great]: "/images/chess/7_great.png",
  [ChessRating.Excellent]: "/images/chess/8_excellent.png",
  [ChessRating.Best]: "/images/chess/9_best.png",
  [ChessRating.Perfect]: "/images/chess/10_perfect.png",
};

/** Fallback in case something is out of range */
export const UNKNOWN_CHESS_RATING_IMAGE = "/images/chess/unknown.png";

/**
 * Returns the appropriate icon path for a rating,
 * or the “unknown” icon if the rating isn’t in the map.
 */
export function getChessRatingImage(r: ChessRating): string {
  return ChessRatingImagePath[r] ?? UNKNOWN_CHESS_RATING_IMAGE;
}
