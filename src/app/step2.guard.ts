import { CanActivateFn, Router } from '@angular/router';
import { CommunicationService, EMPTY_COLOR, EMPTY_MODEL } from './shared/communication.service';
import { inject } from '@angular/core';

export const step2Guard: CanActivateFn = (route, state) => {

  const comService=inject(CommunicationService);
  const router=inject(Router);
  if (comService.currentState.selectedModel!==EMPTY_MODEL && comService.currentState.selectedColor!==EMPTY_COLOR){
    return true;
  }
  else {
    return router.parseUrl('step1');
  }

};
