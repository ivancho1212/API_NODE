import bcryptjs from 'bcryptjs';
import personModel from '../models/person.model.js';
import { faker } from '@faker-js/faker';
import personStatus from '../models/personStatus.model.js';
import jwt from 'jsonwebtoken';

export const createPerson = async (req, res) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const dataPerson = req.body;
        const passwordHash = await bcryptjs.hash(dataPerson.person_password, salt);
        const createPerson = await personModel.create({
            person_person: dataPerson.person_person,
            person_password: passwordHash,
            personStatus_FK: dataPerson.status,
            role_FK: dataPerson.role,
        });
        const token = jwt.sign({ email: createPerson.person_person }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Create Person',
            id: createPerson.person_id,
            token: token
        });
    } catch (error) {
        console.error('Error creating person:', error);
        return res.status(500).json({
            message: `Something went wrong in the consultation: ${error.message}`,
            status: 500,
        });
    }
};


export const showPerson = async (req, res) => {
    try {
        const Persons = await personModel.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Show Person',
            body: Persons,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the consultation',
            status: 500,
        });
    }
};

export const showPersonId = async (req, res) => {
    try {
        const idPerson = req.params.id;
        const person = await personModel.findOne({
            where: {
                person_id: idPerson,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Show Person id',
            body: person,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the request',
            status: 500,
        });
    }
};

export const updatePerson = async (req, res) => {
    try {
        const dataPerson = req.body;
        const idPerson = req.params.id;
        const updatePerson = await personModel.update({
            person_person: dataPerson.person_name,
            person_password: dataPerson.person_password,
            personStatus_FK: dataPerson.status,
            role_FK: dataPerson.role,
        }, {
            where: {
                person_id: idPerson,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Update Person',
            body: updatePerson,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the request',
            status: 500,
        });
    }
};

export const deletePerson = async (req, res) => {
    try {
        const idPerson = req.params.id;
        const deletePerson = await personModel.destroy({
            where: {
                person_id: idPerson,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Delete Person :)',
            body: deletePerson,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the request',
            status: 500,
        });
    }
};

export const createPersonFK = async (req, res) => {
    try {
        const createPerson = await personModel.create({
            person_person: faker.internet.email(),
            person_password: faker.internet.password(),
            PersonStatus_FK: 1,
            role_FK: 1,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Create Person',
            id: createPerson.person_id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the consultation',
            status: 500,
        });
    }
};

export const LoginPerson = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing required field: email, password" });
        }

        const person = await personModel.findOne({
            where: {
                person_person: email,
            }
        });

        if (!person) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcryptjs.compare(password, person.person_password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ email: person.person_person }, process.env.JWK_SECRET, { expiresIn: "1h" }); // Cambiado para usar la referencia correcta

        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Login API :)',
            id: person.person_id,
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the request',
            status: 500,
        });
    }
};
