import express from 'express';
import { SpecimenController } from './specimen.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { SpecimenValidation } from './specimen.validators';

const router = express.Router();

router.get('/', SpecimenController.getAllSpecimen);

router.post(
  '/',
  validateRequest(SpecimenValidation.SpecimenValidator),
  SpecimenController.createSpecimen
);

router.get('/:id', SpecimenController.getSingleSpecimen);

router.patch(
  '/:id',
  validateRequest(SpecimenValidation.SpecimenValidatorForUpdate),
  SpecimenController.updateSpecimen
);

router.delete('/:id', SpecimenController.deleteSpecimen);

export const SpecimenRoutes = { router };
