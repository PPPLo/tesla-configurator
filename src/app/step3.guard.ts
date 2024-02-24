import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommunicationService, EMPTY_CONFIG } from './shared/communication.service';

export const step3Guard: CanActivateFn = (route, state) => {
  
  const comService=inject(CommunicationService);
  const router=inject(Router);
  if (comService.currentState.selectedConfig!==EMPTY_CONFIG){
    return true;
  }
  else {
    return router.parseUrl('step1');
  }
};
