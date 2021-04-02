export interface ProfileModel {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_admin?: boolean;
  is_employee?: boolean;
  is_assistant?: boolean;
  is_active?: boolean;
  profile?: any;
}

export interface NewProfileModel {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_admin?: boolean;
  is_employee?: boolean;
  is_assistant?: boolean;
  is_active?: boolean;
  password?: string;
  password_confirmation?: string;
}
