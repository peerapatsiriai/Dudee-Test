export type MemberDTO = {
    member_id: number;
    account_id: number;
    member_first_name: string;
    member_last_name: string;
    member_status: number;
    member_created_at: Date;
    member_updated_at: Date;
    member_deleted_at?: Date | null;
  };
  