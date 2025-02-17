import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AckService } from './services/ack.service';

export const ackGuard: CanActivateFn = () => {
  const _ackSrv = inject(AckService);
  const _router = inject(Router);

  if (!_ackSrv.ack()) void _router.navigate(['/ack']);
  return true;
};
