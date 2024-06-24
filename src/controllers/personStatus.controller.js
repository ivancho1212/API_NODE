
import personStatusModel from '../models/personStatus.model.js';

export const createPersonStatus = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log para verificar los datos recibidos
        await personStatusModel.sync(); // Sincroniza el modelo con la base de datos
        const dataPersonStatus = req.body;
        const createPerson = await personStatusModel.create({
            personStatus_name: dataPersonStatus.Status_name,
            personStatus_description: dataPersonStatus.Status_description, // Corrección del campo
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Create Person Status',
            id: createPerson.personStatus_id // Asegúrate de que esto coincide con el campo en tu modelo
        });
    } catch (error) {
        console.error('Error creating person status:', error); // Log para depurar el error
        return res.status(500).json({
            message: `Something went wrong in the consultation: ${error.message}`,
            status: 500,
        });
    }
};


export const showPersonStatus = async (req, res) => {
    try {
        const Persons = await personStatusModel.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Show Persons Status',
            body: Persons,
        });
    } catch (error) {
        console.error('Error showing persons status:', error); // Log para depurar el error
        return res.status(500).json({
            message: `Something went wrong in the consultation: ${error.message}`,
            status: 500,
        });
    }
};

export const showIdPersonStatus = async (req, res) => {
    try {
        const idStatus = req.params.id;
        const person = await personStatusModel.findOne({
            where: {
                personStatus_id: idStatus,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Show Person Status id',
            body: person,
        });
    } catch (error) {
        console.error('Error showing person status by id:', error); // Log para depurar el error
        return res.status(500).json({
            message: `Something went wrong in the request: ${error.message}`,
            status: 500,
        });
    }
};

export const updatePersonStatus = async (req, res) => {
    try {
        await personStatusModel.sync();
        const dataPersonStatus = req.body;
        const idStatus = req.params.id;
        const updatePerson = await personStatusModel.update({
            personStatus_name: dataPersonStatus.Status_name,
            personStatus_description: dataPersonStatus.Status_description, // Corrección del campo
        }, {
            where: {
                personStatus_id: idStatus,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Update Person Status',
            body: updatePerson,
        });
    } catch (error) {
        console.error('Error updating person status:', error); // Log para depurar el error
        return res.status(500).json({
            message: `Something went wrong in the request: ${error.message}`,
            status: 500,
        });
    }
};

export const deletePersonStatus = async (req, res) => {
    try {
        await personStatusModel.sync();
        const idStatus = req.params.id;
        const deletePerson = await personStatusModel.destroy({
            where: {
                personStatus_id: idStatus,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Delete Person Status :)',
            body: deletePerson,
        });
    } catch (error) {
        console.error('Error deleting person status:', error); // Log para depurar el error
        return res.status(500).json({
            message: `Something went wrong in the request: ${error.message}`,
            status: 500,
        });
    }
};
