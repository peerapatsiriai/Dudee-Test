export type AccountDTO = {
    account_id: number;
    account_username: string;
    account_password: string;
    account_status: number;
    account_created_at: Date;
    account_updated_at: Date;
    account_deleted_at?: Date | null;
  };
  