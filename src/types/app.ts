export enum Role {
  STUDENT = "student",
  LECTURER = "lecturer",
  COURSE_PROVIDER_ADMIN = "course_provider_admin",
  NO_ROLE = "no_role",
}

export interface UserContextType {
  role: Role;
  userName: string;
}

export interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  disabled?: boolean;
  roles?: Role[];
}
