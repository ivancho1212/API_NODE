import Joi from '@hapi/joi';

export default {
    createPerson: Joi.object({
        person_person: Joi.string().required().min(10),
        person_password: Joi.string().required().min(7),
        personStatus_FK: Joi.number().required(),
        role_FK: Joi.number().required(),
    }),
    updatePerson: Joi.object({
        person_person: Joi.string().required().min(10),
        person_password: Joi.string().required().min(7),
        personStatus_FK: Joi.number().required(),
        role_FK: Joi.number().required(),
    }),
};
