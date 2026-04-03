export class BaseRepository {
  protected getTimestamp(): string {
    return new Date().toISOString();
  }

  protected withTimestamps<T extends Record<string, any>>(data: T): T & { created_at: string; updated_at: string } {
    const timestamp = this.getTimestamp();
    return {
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    };
  }

  protected withUpdateTimestamp<T extends Record<string, any>>(data: T): T & { updated_at: string } {
    return {
      ...data,
      updated_at: this.getTimestamp(),
    };
  }
}
