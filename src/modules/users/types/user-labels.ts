import type {
  UserRole,
  UserStatus,
} from '@/modules/users/types/user-admin.types';

export const userStatusLabelMap: Record<UserStatus, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
};

export const userRoleLabelMap: Record<UserRole, string> = {
  admin: 'Administrador',
  user: 'Usuário',
};
