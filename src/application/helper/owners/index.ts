import type { Request } from 'express';

export const userIsOwner = (request: Request): boolean => request.params.id === request.user.id;
