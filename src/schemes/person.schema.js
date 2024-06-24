import Joi from '@hapi/joi';

export default {
    createPerson: Joi.object({
        person_person: Joi.string().required().email(),
        person_password: Joi.string().required().min(7),
        status: Joi.number().required(),
        role: Joi.number().required(),
    }),
    updatePerson: Joi.object({
        person_person: Joi.string().required().email(),
        person_password: Joi.string().required().min(7),
        status: Joi.number().required(),
        role: Joi.number().required(),
    }),
};
