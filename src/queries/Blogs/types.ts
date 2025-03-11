import { TagPayload, TagsResponse } from "../Tags";

export interface BlogsResponse {
  id: number;
  createdDate: Date;
  modifiedDate: Date;
  createdBy: string;
  modifiedBy: string;
  title: string;
  slug: string;
  content: string;
  userId: string;
  fullName: string;
  tags: TagsResponse[];
  allowComments: boolean;
  hotScore: number;
  isMobile: boolean
}

export interface BlogsPayload {
  userId: number;
  title: string;
  content: string;
  tags: TagPayload[];
  allowComments: boolean;
}
