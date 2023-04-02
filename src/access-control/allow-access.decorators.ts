import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { OwnerGuard } from 'src/guards/owner.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from './roles.enum';

const AllowAccess = (...roles: UserRole[]) => SetMetadata('role', roles);

export const AllowRoles = (...roles: UserRole[]) => {
  return applyDecorators(
    AllowAccess(...roles),
    UseGuards(RolesGuard)
  );
}

export const OnlyRegistered = () => {
  return applyDecorators(
    AllowAccess(
      UserRole.ADMIN,
      UserRole.AUTHOR,
      UserRole.EDITOR,
      UserRole.READER,
    ),
    UseGuards(RolesGuard)
  );
}

export const OnlyReaders = () => {
  return applyDecorators(
    AllowAccess(UserRole.READER),
    UseGuards(RolesGuard)
  );
}

export const OnlyAuthors = () => {
  return applyDecorators(
    AllowAccess(UserRole.AUTHOR),
    UseGuards(RolesGuard)
  );
}

export const OnlyEditors = () => {
  return applyDecorators(
    AllowAccess(UserRole.EDITOR),
    UseGuards(RolesGuard)
  );
}

export const OnlyAdmins = () => {
  return applyDecorators(
    AllowAccess(UserRole.ADMIN),
    UseGuards(RolesGuard)
  );
}

export const OnlyOwner = () => {
  return applyDecorators(
    UseGuards(OwnerGuard)
  );
}