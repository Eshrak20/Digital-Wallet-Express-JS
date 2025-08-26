/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { Query } from "mongoose";
import { excludeField } from "../constants";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter: Record<string, any> = { ...this.query };

    for (const field of excludeField) {
      delete filter[field];
    }

    const finalFilter: Record<string, any> = { ...this.modelQuery.getQuery() };

    if (filter.type) finalFilter.type = filter.type;

    if (filter.startDate || filter.endDate) {
      finalFilter.createdAt = {};
      if (filter.startDate) {
        finalFilter.createdAt.$gte = new Date(filter.startDate);
      }
      if (filter.endDate) {
        const end = new Date(filter.endDate);
        end.setHours(23, 59, 59, 999);
        finalFilter.createdAt.$lte = end;
      }
    }

    this.modelQuery = this.modelQuery.find(finalFilter);

    return this;
  }
search(searchableField: string[]): this {
  const searchTerm = this.query?.searchTerm || this.query?.email || this.query?.phone || "";
  if (!searchTerm) return this;

  const searchQuery: any = {
    $or: searchableField.map(field => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  };

  this.modelQuery = this.modelQuery.find({ ...this.modelQuery.getQuery(), ...searchQuery });
  return this;
}






  sort(): this {
    const sort = this.query?.sort || "-createdAt";

    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }
  fields(): this {
    const fields = this.query?.fields?.split(",").join(" ") || "";

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
  paginate(): this {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  build() {
    return this.modelQuery;
  }

  async getMeta() {
    const filter = this.modelQuery.getQuery();
    const totalDocuments = await this.modelQuery.model.countDocuments(filter);

    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const totalPage = Math.ceil(totalDocuments / limit);

    return { page, limit, total: totalDocuments, totalPage };
  }
}
