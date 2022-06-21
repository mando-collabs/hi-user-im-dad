import type { User } from "@prisma/client";

export class BaseService {
  constructor(protected user: User) {}
}
