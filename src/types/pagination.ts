export type IPaginator = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  prev_url: string;
  next_url: string
};
