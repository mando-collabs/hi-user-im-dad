import { BaseService } from "~/services/base-service.server";
import type { Rating } from "@prisma/client";
import { db } from "~/utils/db.server";

export class RatingsService extends BaseService {
  public upsertRating(rating: { jokeId: number; score: number; ratingId?: number }): Promise<Rating> {
    return db.rating.upsert({
      where: {
        id: rating.ratingId,
        jokeId_userId: {
          jokeId: rating.jokeId,
          userId: this.user.id,
        },
      },
      create: {
        score: rating.score,
        jokeId: rating.jokeId,
        userId: this.user.id,
      },
      update: {
        score: rating.score,
      },
    });
  }
}
