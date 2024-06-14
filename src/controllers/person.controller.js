import {
    getAllPersons,
    getPersonById,
    createPerson as createPersonModel,
    updatePerson as updatePersonModel,
    deletePerson as deletePersonModel,
    getAllStatuses,
    getStatusById
} from '../../db/model.js'; 

export const showPerson = async (req, res) => {
    try {
        const persons = await getAllPersons();
        res.json(persons);
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Error fetching persons' });
    }
};

export const showPersonId = async (req, res) => {
    const { id } = req.params;
    try {
        const person = await getPersonById(id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        console.error('Error fetching person by ID:', error);
        res.status(500).json({ error: 'Error fetching person by ID' });
    }
};

export const createPerson = async (req, res) => {
    const { name, lastName, document, documentType, status } = req.body; // Añadir `status`
    try {
        const id = await createPersonModel({ personName: name, personLast_name: lastName, personNumber: document, documentTypedFk: documentType, statusFk: status });
        res.status(201).json({
            id,
            name,
            lastName,
            document,
            documentType,
            status // Incluir `status` en la respuesta
        });
    } catch (error) {
        console.error('Error creating person:', error);
        res.status(500).json({ error: 'Error creating person' });
    }
};

export const updatePerson = async (req, res) => {
    const { id } = req.params; 
    const { name, lastName, document, documentType, status } = req.body;
    try {
        const affectedRows = await updatePersonModel({ id, personName: name, personLast_name: lastName, personNumber: document, documentTypedFk: documentType, statusFk: status });
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json({ message: 'Person updated successfully' });
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Error updating person' });
    }
};

export const deletePerson = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deletePersonModel(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json({ message: 'Person deleted successfully' });
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Error deleting person' });
    }
};

export const showStatuses = async (req, res) => {
    try {
        const statuses = await getAllStatuses();
        res.json(statuses);
    } catch (error) {
        console.error('Error fetching statuses:', error);
        res.status(500).json({ error: 'Error fetching statuses' });
    }
};

export const showStatusById = async (req, res) => {
    const { id } = req.params;
    try {
        const status = await getStatusById(id);
        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }
        res.json(status);
    } catch (error) {
        console.error('Error fetching status by ID:', error);
        res.status(500).json({ error: 'Error fetching status by ID' });
    }
};
